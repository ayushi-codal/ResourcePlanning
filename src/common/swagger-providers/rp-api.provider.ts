import {
    HttpClient,
    HttpHeaders,
    HttpResponse
} from '@angular/common/http'
import {
    Observable,
    throwError
} from 'rxjs';
import {
    map,
    catchError
} from 'rxjs/operators';
import {
    Injectable
} from '@angular/core';

export interface Employee {
    id ? : number;
    employee_code ? : string;
    first_name ? : string;
    last_name ? : string;
    position ? : string;
}

export interface EmployeeWrapper {
    body: Employee,
        headers: HttpHeaders
}
export interface Employeeprojectrelation {
    id ? : number;
    project_code ? : number;
    employee_id ? : number;
    start_date ? : string;
    end_date ? : string;
    work_alloted ? : number;
    work_alloted_description ? : string;
    updated_date ? : string;
    created_date ? : string;
}

export interface EmployeeprojectrelationWrapper {
    body: Employeeprojectrelation,
        headers: HttpHeaders
}
export interface Project {
    project_code ? : number;
    project_name ? : string;
    start_date ? : string;
    end_date ? : string;
    project_lead ? : number;
    project_technology ? : string;
    update_date ? : string;
    create_date ? : string;
}

export interface ProjectWrapper {
    body: Project,
        headers: HttpHeaders
}
export interface ErrorResponse {
    status ? : string;
    messages: Array < string > ;
    file ? : string;
    line ? : number;
    trace ? : Array < string > ;
}

export interface ErrorResponseWrapper {
    body: ErrorResponse,
        headers: HttpHeaders
}
export interface PagingData {
    currentPage ? : number;
    nextPage ? : number;
    prevPage ? : number;
    totalItems ? : number;
    totalPages ? : number;
    firstPage ? : number;
    lastPage ? : number;
}

export interface PagingDataWrapper {
    body: PagingData,
        headers: HttpHeaders
}

/**
 * 
 * @class ResorcePlanningApi
 * @param [domainOrOptions] - The project domain.
 */
@Injectable()
export class ResorcePlanningApi {

    public domain: string;

    constructor(private http: HttpClient) { // had to include HTTP_PROVIDERS in bootstrap (global) for this to work. Workaround needed
        this.domain = "http://b3e2a3a6.ngrok.io";
    }

    /**
     * Handles api call error
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: any) {
        let errMsg = error || {
            status: 500
        };
        return throwError(errMsg);
    }

    /**
     * Set pattern type parameters
     * @param pattern - the regex pattern
     * @returns {Object} the query parameters
     */
    private setPatternTypeParameter(pattern: string, queryParameters: any, parameters: any) {
        Object.keys(parameters).forEach(function(parameterName) {
            if (new RegExp(pattern).test(parameterName)) {
                queryParameters[parameterName] = parameters[parameterName];
            }
        });
        return queryParameters;
    }

    /**
     * Set pattern type parameters
     * @param camelCaseName - the camel case name of the parameter
     * @param name - the name of the parameter
     * @returns {Object} the query parameters
     */
    private setNonPatternTypeParameter(camelCaseName: string, name: string, queryParameters: any, parameters: any) {
        if (parameters[camelCaseName] !== undefined) {
            queryParameters[name] = parameters[camelCaseName];
        }
        return queryParameters;
    }

    /**
     * Returns the api call url
     * @param path - the path of the endpoint
     * @param queryParameters - the corresponding query parameters
     * @returns {string} - the complete query api call url
     */
    private getUrl(path: string, queryParameters: any) {

        let paramsStr = Object.keys(queryParameters).map(function(key) {
            return key + '=' + encodeURIComponent(queryParameters[key]);
        }).join('&');

        let url = paramsStr ? this.domain + path + '?' + paramsStr : this.domain + path;
        return url;
    }

    /**
     * Returns the query parameters
     * @param parameters - the api call parameters
     * @param queryParameters - the corresponding query parameters
     * @returns - the query parameters of the api call
     */
    private setQueryParameters(parameters: any, queryParameters: any) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            var parameter = parameters.$queryParameters[parameterName];
            queryParameters[parameterName] = parameter;
        });
        return queryParameters;
    }

    /**
     * Returns a Employee details based on a single ID
     * @method
     * @name ResorcePlanningApi#GetEmployee
     *
     */
    GetEmployee(parameters: {
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < EmployeeWrapper > {
        let domain = this.domain;
        let path = '/Employee/index';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Returns a Employee based on a single ID
     * @method
     * @name ResorcePlanningApi#GetEmployeeById
     * @param  id - ID of Employee
     *
     */
    GetEmployeeById(parameters: {
        'id': number,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < EmployeeWrapper > {
        let domain = this.domain;
        let path = '/employee/{id}';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Returns a Relation between employee and project based on a single ID
     * @method
     * @name ResorcePlanningApi#GetEmployee_1
     *
     */
    GetEmployee_1(parameters: {
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < EmployeeprojectrelationWrapper > {
        let domain = this.domain;
        let path = '/Employeeprojectrelation/indexRelation';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * create new employee
     * @method
     * @name ResorcePlanningApi#CreateEmployee
     * @param  body - insert record
     *
     */
    CreateEmployee(parameters: {
        'body' ? : Employeeprojectrelation,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < any > {
        let domain = this.domain;
        let path = '/Employeeprojectrelation/projectAllocation';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['body'] !== undefined) {
            body = JSON.stringify(parameters['body']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Update existing employee project details
     * @method
     * @name ResorcePlanningApi#Update_Relation_Detials
     * @param  id - ID of Employee Project Relation
     * @param  body - Update Employee Project Relation details
     *
     */
    Update_Relation_Detials(parameters: {
        'id': number,
        'body' ? : Employeeprojectrelation,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < any > {
        let domain = this.domain;
        let path = '/EmployeeProjectRelation/update/{id}';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['body'] !== undefined) {
            body = JSON.stringify(parameters['body']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * deletes a single relation record based on the ID
     * @method
     * @name ResorcePlanningApi#Delete_Employee_Project_Relation
     * @param  id - ID of relation data to be delete
     *
     */
    Delete_Employee_Project_Relation(parameters: {
        'id': number,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < any > {
        let domain = this.domain;
        let path = '/Employeeprojectrelation/delete/{id}';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Returns all department from the system that the user has access to
     * @method
     * @name ResorcePlanningApi#GetRelationData
     * @param  id - ID of Employee project
     *
     */
    GetRelationData(parameters: {
        'id': number,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < EmployeeprojectrelationWrapper > {
        let domain = this.domain;
        let path = '/Employee/{id}/project';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Returns all department from the system that the user has access to
     * @method
     * @name ResorcePlanningApi#GetRelationData_1
     * @param  id - ID of Employee project
     *
     */
    GetRelationData_1(parameters: {
        'id': number,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < EmployeeprojectrelationWrapper > {
        let domain = this.domain;
        let path = '/Project/{id}/employee';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Update existing employee project details
     * @method
     * @name ResorcePlanningApi#Update_Relation_Detials_1
     * @param  id - ID of Employee Project Relation
     * @param  body - Update Employee Project Relation details
     *
     */
    Update_Relation_Detials_1(parameters: {
        'id': number,
        'body' ? : any,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < any > {
        let domain = this.domain;
        let path = '/allocation/{id}';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['body'] !== undefined) {
            body = JSON.stringify(parameters['body']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Returns a Projects details based on a single ID
     * @method
     * @name ResorcePlanningApi#GetEmployee_2
     *
     */
    GetEmployee_2(parameters: {
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < ProjectWrapper > {
        let domain = this.domain;
        let path = '/Project/index';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Returns a Project based on a single ID
     * @method
     * @name ResorcePlanningApi#GetEmployee_3
     * @param  id - ID of project
     *
     */
    GetEmployee_3(parameters: {
        'id': number,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < ProjectWrapper > {
        let domain = this.domain;
        let path = '/project/{id}';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * create new project
     * @method
     * @name ResorcePlanningApi#CreateEmployee_1
     * @param  body - insert record
     *
     */
    CreateEmployee_1(parameters: {
        'body' ? : Project,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < any > {
        let domain = this.domain;
        let path = '/Project/create';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['body'] !== undefined) {
            body = JSON.stringify(parameters['body']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * Update existing  project details
     * @method
     * @name ResorcePlanningApi#UpdateEmployee
     * @param  id - ID of Employee project
     * @param  body - Update project details
     *
     */
    UpdateEmployee(parameters: {
        'id': number,
        'body' ? : Project,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < any > {
        let domain = this.domain;
        let path = '/Project/update/{id}';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['body'] !== undefined) {
            body = JSON.stringify(parameters['body']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
    /**
     * deletes a single  project record based on the ID
     * @method
     * @name ResorcePlanningApi#DeleteEmployee
     * @param  id - ID of Project data to delete
     *
     */
    DeleteEmployee(parameters: {
        'id': number,
        $queryParameters ? : {}
    }, headers: HttpHeaders): Observable < any > {
        let domain = this.domain;
        let path = '/Project/delete/{id}';
        let body: string = '';
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        // TODO check if param is required in header or body
        // if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        // }

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            )
    };
}

export const APP_API_PROVIDERS = [ResorcePlanningApi];