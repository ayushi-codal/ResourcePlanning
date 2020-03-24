import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResorcePlanningApi } from 'src/common/swagger-providers/rp-api.provider';
import { HeadersProvider } from 'headerProviders/header.provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    const body = this.registerForm.value
    
      this.rp.CreateEmployee_1(body, headers).subscribe(data =>{

      });
      this.showModal = false;
    }
   
}
  

}
