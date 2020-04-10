import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from 'src/app/resources/data.service';
@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.css'],
})
export class EmployeetableComponent implements OnInit {
  @Output() public empList = new EventEmitter<any>();
  @Output() eventClicked = new EventEmitter<Event>();
  @Output() public index = new EventEmitter<any>();
  @Input() public newResReceived: Array<any> = [];
  userData: any = [];
  users: any = [];
  projectList: any = [];
  projects: any = [];
  expandedIndex: number;
  projectsData: any = [];
  constructor(
    private cd: ChangeDetectorRef,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getEmployeeList();
    if (this.newResReceived) {
      console.log(this.newResReceived);
    }
  }
  getEmployees(index: number, idd, event: Event) {
    console.log('this.expandedIndex', this.expandedIndex);
    console.log('index', index)
    console.log(event);
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
    console.log('this.expandedIndex', this.expandedIndex)
    console.log(idd)
    this.dataService.getEmployee(idd).subscribe((res: any) => {
      console.log(res);
      let a = [];
      for (let project of res) {
        let isExists = a.findIndex(t => t.id === project.id);
        console.log(isExists)
        if (isExists === -1) {
          project.projects = [project]
          a.push(project);
        } else {
          a[isExists].projects.push(project)
        }
      }
      if (res) {
        var newobj = [];
        a.forEach(element => {
          (element.projects).forEach(el => {
            newobj.push({ allocation: 30, pname: el.project_name, pcode: el.project_code, ecode: el.employee_code, ename: el.user_name });
          })
          console.log(newobj)
          this.projectList = newobj;
        });
        console.log(newobj);
        this.users = a;
        this.dataService.projectList(this.users);
        this.empList.emit({ a, idd });
        this.eventClicked.emit(event);
        this.index.emit(idd);
        console.log(this.users[0].projects)

      }
    },
      (error) => {
        console.log(error);
      }
    )
  }
  getColor(allocations, len) {
    for (var i = 0; i < len; i++) {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      let s = { 'backgroundColor': "#" + randomColor, 'width': allocations + "%" };
      return s;
    }
  }

  getEmployeeList() {
    this.dataService.getEmployeeList().subscribe((res: any) => {
      console.log(res);

      this.userData = res;

    })
  }

  Collaps(index: number) {
    console.log("jiii" + index)
    this.expandedIndex = index === this.expandedIndex ? -1 : index;

  }
}



