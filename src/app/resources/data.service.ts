import { Injectable } from '@angular/core';
import { ResorcePlanningApi } from 'src/common/swagger-providers/rp-api.provider';
import { HttpHeaders } from '@angular/common/http';
import { HeadersProvider } from '../headers/header.provider'
@Injectable({
  providedIn: 'root'
})
export class DataService extends HeadersProvider {
  projList : any = [];
  constructor(private rpService : ResorcePlanningApi) {
    super();
  }
  projectList(proj)
  {
    this.projList = proj;
  }
  getEmployee(idd)
  {
    const params = {
      id: idd ,
    }
    // let headers = new HttpHeaders();
    // headers.append('X-Requested-With', 'XMLHttpRequest');
    // headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    return this.rpService.GetRelationData(params, HeadersProvider.publicHeaders);
  }
  getEmployeeList(){
    return this.rpService.GetEmployee({}, HeadersProvider.publicHeaders) ; 
  }
}
