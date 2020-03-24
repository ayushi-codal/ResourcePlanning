#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const commandLineArgs = require('command-line-args');
const codeGen = require('swagger-js-codegen').CodeGen;
const convertType = require('swagger-js-codegen/lib/typescript').convertType;

const swaggerProvidersPath = '../src/common/swagger-providers';
const cmdOptions = commandLineArgs([{ name: 'use-local', type: Boolean }], {
  partial: true,
});
const appConfig = require('../app.config');

const services = [
  {
    className: 'ResorcePlanningApi',
    apiName: 'API',
    url: appConfig.SWAGGER_URL,
    fileName: 'rp-api.provider.ts',
  }
];

/**
 * Gets JSON spec from a given host and path (url)
 * @param host
 * @param path
 */
function getSpec(host, path) {
  console.log('Calling ', `${host}${path}`);
  const options = {
    host: host.match(/[http|https]:\/\/(.+)/)[1],
    path: path,
  };

  return new Promise((resolve, reject) => {
    const request = http.get(options, response => {
      let body = '';
      response.on('data', chunk => (body += chunk));
      response.on('end', () => resolve(JSON.parse(body)));
    });
    request.on('error', err => reject(err));
  });
}

/**
 * Generates the provider file for the corresponding service
 * @param service
 */
function generateProviderFile(service) {
  getSpec(service.url, '/swagger')
    .then(jsonObj => handleSwaggerResponse(service, jsonObj))
    .catch(error => console.log(error));
}

/**
 * Handle swagger response
 * @param serviceObject
 * @param spec
 */
function handleSwaggerResponse(serviceObject, spec) {
  const templatesDir = path.join(__dirname, 'templates');

  const source = codeGen.getTypescriptCode({
    lint: false,
    swagger: spec,
    apiName: serviceObject.apiName,
    moduleName: serviceObject.apiName,
    className: serviceObject['className'],
    template: {
      class: fs.readFileSync(
        path.join(templatesDir, 'class.mustache'),
        'utf-8'
      ),
      method: fs.readFileSync(
        path.join(templatesDir, 'method.mustache'),
        'utf-8'
      ),
      request: fs.readFileSync(
        path.join(templatesDir, 'request.mustache'),
        'utf-8'
      ),
    },
    mustache: {
      hasResponseBody() {
        return this.method.toLowerCase() !== 'delete';
      },
      getLowercaseMethod() {
        return function(val, render) {
          return this.method.toLowerCase();
        };
      },
      getResponseType() {
        return function(val, render) {
          return processSuccessResponses(spec, this.path, this.method, render);
        };
      },
      getName() {
        return function(text, render) {
          // Add quotes in case property contains a hyphen
          return this.name.match(/\-/) ? `"${this.name}"` : this.name;
        };
      },
      getApiUrl() {
        return function(text, render) {
          return `"${serviceObject.url}"`;
        };
      },
      getType() {
        const identity = elementType => elementType;
        return function _getType(text, render) {
          if (this.tsType.isAtomic || this.tsType.isEnum)
            return render(this.tsType.tsType);
          if (this.tsType.isRef) return render(this.tsType.target);
          if (this.tsType.isObject) return render('any');
          if (this.tsType.isArray) {
            return render(
              `Array<${_getType.call(
                { tsType: this.tsType.elementType },
                null,
                identity
              )}>`
            );
          }
        };
      },
      definitions: Object.keys(spec.definitions).map(definition => ({
        name: definition,
        properties: createPropertiesArray(
          spec.definitions[definition],
          spec.definitions
        ),
      })),
    },
  });

  const swaggerProviderFilePath = path.join(
    __dirname,
    swaggerProvidersPath,
    serviceObject.fileName
  );
  fs.writeFileSync(swaggerProviderFilePath, source);
  console.log(
    `${serviceObject.className} file generated: ${serviceObject.fileName}`
  );
}

function createPropertiesArray(definition, definitions) {
  if (definition.hasOwnProperty('allOf')) {
    let properties = [];
    definition.allOf.forEach(composedProperties => {
      if (composedProperties.hasOwnProperty('$ref')) {
        const reference = composedProperties['$ref'].replace(
          '#/definitions/',
          ''
        );
        const referenceDefinitionProperties = createPropertiesArray(
          definitions[reference],
          definitions
        );
        properties = properties.concat(referenceDefinitionProperties);
      }
      properties = properties.concat(
        createPropertiesArray(composedProperties, definitions)
      );
    });
    return properties;
  }

  return Object.keys(definition.properties || {}).map(propertyName =>
    createPropertyObject(definition, propertyName)
  );
}

function createPropertyObject(definition, propertyName) {
  const property = definition.properties[propertyName];
  const prop = {
    name: propertyName,
    type: property.type,
    $ref: property.ref,
    cardinality:
      (definition.required || []).indexOf(propertyName) !== -1 ? '' : '?',
    items: property.items,
  };

  prop.tsType = convertType(prop);
  return prop;
}

/**
 * Process the success responses from swagger api
 */
function processSuccessResponses(spec, endPointPath, httpMethod, render) {
  const definition = spec.paths[endPointPath][httpMethod.toLowerCase()];
  const successResponseTypes = new Set();
  const any = 'any';

  for (const responseCode in definition.responses) {
    if (responseCode < 200 || responseCode > 299) break;

    const response = definition.responses[responseCode];
    let successResponseType = any;

    if (response.schema) {
      const tsType = convertType(response.schema, spec);
      successResponseType = tsType.isRef
        ? `${tsType.target}Wrapper`
        : tsType.isObject
        ? any
        : tsType.tsType;
    }

    // use 'any' as the type instead of a type union, as 'any' includes everything
    if (successResponseType === any) return render(any);
    successResponseTypes.add(successResponseType);
  }
  return render(Array.from(successResponseTypes).join('|') || 'any');
}

/**
 * Goes through the services and generate the corresponding
 * provider file.
 */
function generateProviderFiles() {
  for (service of services) {
    const swagerProviderFile = path.join(
      __dirname,
      swaggerProvidersPath,
      service.fileName
    );
    if (cmdOptions['use-local'] && fs.existsSync(swagerProviderFile)) {
      console.log(`use-local - ${service.fileName}.`);
      continue;
    }
    generateProviderFile(service);
  }
}

generateProviderFiles();
