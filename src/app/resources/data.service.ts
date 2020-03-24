import { Injectable } from '@angular/core';
import { ResorcePlanningApi } from 'src/common/swagger-providers/rp-api.provider';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  employeeList : any[];
  constructor(private rpService : ResorcePlanningApi) { }
  getEmployee(idd)
  {
    console.log('API Before' + idd);
// {
//       return this.pmsAPI.company_read({ id }, this.headers);
//     }
    const params = {
      id: idd ,
    }
    // console.log("params:", params)
    let headers = new HttpHeaders();
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    console.log('headers',headers)
    return this.rpService.GetRelationData(params, headers);
     
  }
  getEmployeeList(){
    let headers = new HttpHeaders();
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    console.log('headers',headers)
    return this.rpService.GetEmployee({}, headers);
  }
  // getProjects()
  // {
  //   const params = {
  //     id: 1
  //   }
  //   console.log("params:", params)
  //   let headers = new HttpHeaders();
  //   headers.append('X-Requested-With', 'XMLHttpRequest');
  //   headers.append('Accept', 'application/json');
  //   headers.append('Content-Type', 'application/json');
  //   console.log('headers',headers)
  //   return this.rpService.GetRelationData_2(params, headers);
  // }
 
}
