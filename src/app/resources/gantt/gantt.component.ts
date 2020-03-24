import { Component, NgZone, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import * as moment from 'moment';
import { EmployeeService} from 'src/app/resources/employee.service';
import {Gantt} from 'node_modules/frappe-gantt/src/index.js';
import { DataService } from '../data.service';
import { AppComponent} from 'src/app/app.component'
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent  {
  @Input() public resultGridList : Array <any> = [];
  @Input() event: Event;
  @Input() public indexGot : any;
  @ViewChild('gantt',{static: true}) gantt: ElementRef;
  dataSource: Object;
  title: string;
  chart: any;
  tasks : any;
  array : any[];
  showContent : boolean;
  mode : any;
  constructor( private ds : DataService, private a : AppComponent) {}
  ngAfterViewInit(){
    // console.log(event)
    // console.log(this.resultGridList);
    // console.log(this.a.data)
    for( var i =0; i<this.resultGridList.length;i++)
    {
      var newobj = [];
      this.resultGridList[i].projects.forEach(element => {
        newobj.push({ id: element.project_code, name: element.project_name, start: element.start_date,
        end : element.end_date });
        this.tasks = newobj;
    });
    }
   
    // this.tasks = [
    //   {
    //     id: 'Task 1',
    //     name: 'Redesign website',
    //     start: '2020-11-28',
    //     end: '2020-12-31',
    //     progress: 20,
    //     dependencies: null,
    //     custom_class: 'bar-milestone' // optional
    //   }
      
    // ]
    // this.es.getTasks().subscribe((data : any[])=>{
    
      // console.log(data);
      // this.tasks = data;
      console.log(this.tasks)
    this.gantt.nativeElement = new Gantt(this.gantt.nativeElement, this.tasks, {
      header_height: 50,
      column_width: 30,
      step: 24,
      // view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
      bar_height: 20,
      bar_corner_radius: 3,
      arrow_curve: 5,
      padding: 18,
      view_mode: 'Year',
      date_format: 'DD-MM-YYYY',
      custom_popup_html: function(task) {
        // the task object will contain the updated
        // dates and progress value
        // const end_date = task._end.format('MMM D');
        return `
          <div class="details-container">
            <h5>${task.name}</h5>
            <p>Expected to finish by ${task.end}</p>
            <p>${task.progress}% completed!</p>
          </div>
        `;
      },
      on_click: function (task) {
				console.log(task);
			},
			on_date_change: function(task, start, end) {
				console.log(task, start, end);
			},
			on_progress_change: function(task, progress) {
				console.log(task, progress);
			},
			on_view_change: function(mode) {
				console.log(mode);
			},
			language: 'en'
    })
    
  
  }
  changeViewMode(eventt)
  {
    console.log(eventt.srcElement.value);
    this.mode = eventt.srcElement.value;
    return this.mode;
  }
  
// toggle_class = function($this){
//   // toggle class
//       var elemtns = document.querySelectorAll(".change")
//       for(i=0; i<elemtns.length; i++){
//         elemtns[i].classList.remove("is-active")
//       }
      
//       $this.parentNode.classList.add("is-active")
  
//   }
  
//   window.change = function ($this) {
//     //$this.preventDefault();
//       gantt.hide_popup();
//       gantt.change_view_mode($this.textContent);
//     toggle_class($this);
  
//   }
  
  
//   document.addEventListener('DOMContentLoaded', function(){
//    gantt = new Gantt_( document.querySelector("#gantt"), tasks);
//    gantt.change_view_mode();
//    var e = document.querySelector(".change a")
//    toggle_class(e);
//   });
  
}



