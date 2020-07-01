import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ResorcePlanningApi } from 'src/common/swagger-providers/rp-api.provider';
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
  newData: any = [];
  empList: any[];
  keyword = 'id';
  constructor(private formBuilder: FormBuilder, private rp: ResorcePlanningApi) { }
  show() {
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      // employeeId: ['', Validators.required],
      employeeCode: ['', [Validators.required, Validators.maxLength(6)]],
      projectCode: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      allocation: ['', [Validators.required]],
      allocationDesc: ['', [Validators.required]]
    });
    let headers = new HttpHeaders();
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    this.rp.GetEmployee({}, headers).subscribe((res: any) => {
      this.empList = res;
    });

  }


  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  // convenience getter for easy access to form fields
  get formFields() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.newData = (this.registerForm.value);
      this.newAlloacation.emit(this.newData);
      let headers = new HttpHeaders();
      headers.append('X-Requested-With', 'XMLHttpRequest');
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      const body = this.registerForm.value;
      const params = {
        body: {

          // "id": Number(this.newData.employeeId),
          "employee_code": Number(this.newData.employeeCode),
          "project_code": Number(this.newData.projectCode),
          "start_date": this.newData.startDate,
          "end_date": this.newData.endDate,
          "work_alloted": Number(this.newData.allocation),
          "work_alloted_description": this.newData.allocationDesc,
          "created_date": "2020-03-26 19:36:54",
          "updated_date": "2020-03-26 19:36:54"
        }
      }
      this.rp.CreateEmployee(params, headers).subscribe(res => {
        console.log(res);
      });

      this.showModal = false;
    }

  }


}
