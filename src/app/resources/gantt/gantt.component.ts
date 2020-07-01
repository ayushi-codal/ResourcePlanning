import { Component, NgZone, ViewChild, ElementRef, Input, SimpleChanges,  Output, EventEmitter } from "@angular/core";
import * as moment from 'moment';
import {Gantt} from 'node_modules/frappe-gantt/src/index.js';
import { ProjectList } from '../models/project.model';
import { GanttTasks } from '../models/ganttTasks.model';
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent {
  @Input() public resultGridList : Array<ProjectList> = [];
  @Output() showVal = new EventEmitter();
  @ViewChild('gantt',{static: true}) gantt: ElementRef;
  dataSource: Object;
  title: string;
  chart: any;
  tasks : GanttTasks[] = [];
  showContent : boolean;
  mode : any;
  changeLog: any;
 
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let fChange = chng.firstChange;
      let cur   = (chng.currentValue);
      let prev = (chng.previousValue);
      if(fChange || (cur[0].id !== prev[0].id)  )
      {
        this.showContent = true;
        this.showVal.emit(this.showContent) ;
      }
      
      else{
        this.showContent = false;
        this.showVal.emit(this.showContent) ;
      }
    }
  }
  
  ngAfterViewInit(){ 
    console.log(this.resultGridList)
    for( var i =0; i<this.resultGridList.length;i++)
    {
      var newobj = [];
      this.resultGridList[i].projects.forEach(element => {
        newobj.push({ id: element.project_code, name: element.project_name, start: element.start_date,
        end : element.end_date, progress:'20' });
        this.tasks = newobj;
    });
    }
    this.gantt.nativeElement = new Gantt(this.gantt.nativeElement, this.tasks, {
      header_height: 40,
      column_width: 20,
      popup_trigger: 'mouseover',
      custom_class: "bar-milestone",
      step: 24,
      view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
      bar_height: 20,
      bar_corner_radius: 3,
      arrow_curve: 5,
      padding: 18,
      margin: 10,
      view_mode:  'Year',
      date_format: 'DD-MM-YYYY',
      
      custom_popup_html: function(task) {
        return `
          <div class="details-container">
            <h5 style="color: white; " >${task.name}</h5>
            <p style="color: white; padding-left : 20px; padding-right : 10px;"><b>Start Date:</b> ${task.start}</p>
            <p style="color: white;padding-left : 20px;padding-right : 10px; "><b>End Date:</b> ${task.end}</p>
            <p style="color: white; padding-left : 20px;padding-right : 10px;"><b>Allocation%:</b> ${task.progress}</p>

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
  reloadNew(task)
  {
    this.gantt.nativeElement.refresh(task);
  }
changeViewMode(eventt)
  {
    this.gantt.nativeElement.change_view_mode(eventt.srcElement.value);
  }
}



