import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DataService } from 'src/app/resources/data.service';
import { Observable } from "rxjs/Rx";
import { ResorcePlanningApi } from 'src/common/swagger-providers/rp-api.provider'
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeetableComponent implements OnInit {
  @Output() public empList = new EventEmitter<any>();
  @Output() eventClicked = new EventEmitter<Event>();
  @Output() public index = new EventEmitter<any>();
  @Input() public newResReceived : Array <any> = [];
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Project>>;
  dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  userData: any = [];
  users: any = [];
  projects: any = [];
  columnsToDisplay = ['id', 'name', 'email'];
  innerDisplayedColumns = ['pId', 'pName', 'start', 'end', 'managers', 'technology'];
  expandedElement: User[] = [];
  expandedIndex: number;
  projectsData: any = [];
  constructor(
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private rpService: ResorcePlanningApi
  ) 
  {

  }

  ngOnInit() {
    
this.getEmployeeList();
    // this.getEmployees(this.expandedIndex)
    USERS.forEach(user => {
      if (user.projects && Array.isArray(user.projects) && user.projects.length) {
        this.usersData = [...this.usersData, { ...user, projects: new MatTableDataSource(user.projects) }];
      } else {
        this.usersData = [...this.usersData, user];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
    this.dataSource.sort = this.sort;
    if(this.newResReceived)
    {
      console.log(this.newResReceived);
    }
  }
  getEmployees(index: number,idd,event: Event) {
    console.log('this.expandedIndex',this.expandedIndex);
    console.log('index',index)
    console.log(event);
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
    console.log('this.expandedIndex',this.expandedIndex)
    console.log(idd)
    this.dataService.getEmployee(idd).subscribe((res: any) => {
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
        this.users = a;
        this.empList.emit({a,idd});
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
  
  getEmployeeList()
  {
    this.dataService.getEmployeeList().subscribe((res:any)=>{
      console.log(res);
      // var newobj = [];
      //      var a = res;
      //     console.log(a);
          // if(!(a.id in newobj.json)) {
          //     newobj.json[a.id] = [];
          // }
      //   a.forEach(element => {
      //     newobj.push({ namee: element.id, idd: element.user_name });
      //     });
      // // }
      // console.log(newobj);
      this.userData = res;
      
    })
  }


  checkExpanded(element): boolean {
    let flag = false;
    this.expandedElement.forEach(e => {
      if (e === element) {
        flag = true;

      }
    });
    return flag;
  }
  toggleRow(element: User) {
    const index = this.expandedElement.indexOf(element);
    console.log(index);
    if (index === -1) {
      this.expandedElement.push(element);
    } else {
      this.expandedElement.splice(index, 1);
    }
  }
  Collaps(index: number) {
    console.log("jiii" + index)
    this.expandedIndex = index === this.expandedIndex ? -1 : index;

  }
  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Project>).filter = filterValue.trim().toLowerCase());
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
  projects?: Project[] | MatTableDataSource<Project>;
}

export interface Project {
  pId: number;
  pName: string;
  start: string;
  end: string;
  managers: string;
  technology: any[];

}

export interface UserDataSource {
  id: number;
  name: string;
  email: string;
  projects?: MatTableDataSource<Project>;
}

const USERS: User[] = 
[

  {
    id: 2,
    name: "Ayushi Maru",
    email: "amaru@codal.com",
    projects: [
      {
        pId: 23,
        pName: "CATO",
        start: "2020/12/23",
        end: "2020/12/25",
        managers: "Manish Dariyani",
        technology: ["php", "angular"]
      },
      {
        pId: 2,
        pName: "RP",
        start: "2020/12/23",
        end: "2020/12/25",
        managers: "Anil Shahu",
        technology: ["php", "angular"]
      },


    ]
  },
  {
    id: 233,
    name: "Hani Joshi",
    email: "hjoshi@codal.com",
    projects: [
      {
        pId: 23,
        pName: "CATO",
        start: "2020/12/23",
        end: "2020/12/25",
        managers: "Manish Dariyani",
        technology: ["php", "angular"]
      },
      {
        pId: 3,
        pName: "ML",
        start: "2020/12/23",
        end: "2020/12/25",
        managers: "Anil Shahu",
        technology: ["php", "angular"]
      },


    ]
  }

];



