import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResorcePlanningApi } from 'src/common/swagger-providers/rp-api.provider';
import { HeadersProvider } from 'headerProviders/header.provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  @Output() public newAlloacation = new EventEmitter<any>();
  title = 'angularpopup';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  newData : any=[];
  constructor(private formBuilder: FormBuilder, private rp : ResorcePlanningApi) { }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      allocation : ['',[Validators.required]],
      projectName: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
        employeeCode: ['', [Validators.required, Validators.maxLength(6)]],
        startDate: ['', [Validators.required]]
    });
}
// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }
onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      console.log(this.registerForm.value);
this.newData = this.registerForm.value;
      this.newAlloacation.emit(this.newData);
      let headers = new HttpHeaders();
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    console.log('headers',headers)
    const body = this.registerForm.value;
    const params ={
      body:{
      // id: 1,
      // project_code : 2,
      // employee_id :5,
      // updated_date : "2016-01-12 15:12:34",
      // created_date : "2016-01-12 15:12:34"
      "id": 0,
      "project_code": 0,
      "employee_id": 0,
      "updated_date": "23/23/2333",
      "created_date": "sss"
      }
 
      // data : this.registerForm.value
    }
    const params1 = {
      body:{
        "project_code": 2,
        "project_name": "string",
        "start_date": "string",
        "end_date": "string",
        "project_lead": 1,
        "project_technology": "string",
        "project_perc_alloted": 20,
        "alloted_description": "string",
        "update_date": "string",
        "create_date": "string"
      }
    }
      //  this.rp.CreateEmployee(params, headers).subscribe(res=>{
      //    console.log(res);
      //  });
       forkJoin(this.rp.CreateEmployee(params,headers), 
        this.rp.CreateEmployee_1(params1,headers))
       .subscribe(([call1Response, call2Response]) => {
            console.log(call1Response);
            console.log(call2Response);
       }

       )
      this.showModal = false;
    }
   
}
  

}
