import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  SERVER_URL: string = "http://localhost:8080/api/";

  
  constructor(private http: HttpClient) { }
  


  public getEmployees(){ 
       return this.http.get(this.SERVER_URL + 'employeeDetails');
  }
  public getTasks()
  {
    return this.http.get(this.SERVER_URL + 'tasks')
  }
  public getTaskss()
  {
    return this.http.get(this.SERVER_URL + 'api')
  }
  // public getProjects() 
  // {
  //   return this.httpClient.get(this.SERVER_URL + 'projectDetails')
  // }

  // public getEmployee(policyId){
  //      return this.httpClient.get(`${this.SERVER_URL + 'employeeDetails'}/${policyId}`); 
  // }
}
