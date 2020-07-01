import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from 'src/app/resources/data.service';
import {Employee} from '../models/employee.model';
import { Project, ProjectList } from '../models/project.model';
@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.css'],
})
export class EmployeetableComponent implements OnInit {
  @Output() public empList = new EventEmitter<any>();
  @Input() public newResReceived: Array<any> = [];
  userData: Employee[] = [];
  users: ProjectList[] = [];
  projectList: Project[] = [];
  expandedIndex: number;
  click = 0;
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getEmployeeList();
    if (this.newResReceived) {
      console.log(this.newResReceived);
    }
  }
  getEmployees(index: number, idd, event: Event) {
    this.click ++;
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
    this.dataService.getEmployee(idd).subscribe((res: any) => {
      console.log(res)
      let newData = [];
      for (let project of res) {
        let isExists = newData.findIndex(t => t.id === project.id);
        if (isExists === -1) {
          project.projects = [project]
          newData.push(project);
        } else {
          newData[isExists].projects.push(project)
        }
      }
      if (res) {
        var newobj = [];
        newData.forEach(element => {
          
          (element.projects).forEach(el => {
            newobj.push({ allocation: 30, pname: el.project_name, pcode: el.project_code, ecode: el.employee_code, ename: el.user_name });
          })
          this.projectList = newobj;
        });
        this.users = newData;
        this.dataService.projectList(this.users);
        this.empList.emit({ newData, idd });

      }
    },
      (error) => {
        console.log(error);
      }
    )
  }
  getColor(allocations, len) {
    console.log(this.click)
    for (var i = 0; i < len; i++) {
      var randomColor = Math.floor(Math.random() * 0xFFFFFF<<0).toString(16);
      let s = { 'backgroundColor': "#" + randomColor, 'width': allocations + "%" };
      return s;
    }
  }

  getEmployeeList() {
    this.dataService.getEmployeeList().subscribe((res: any) => {
      this.userData = res;
    })
  }

  Collaps(index: number) {
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }
}



