import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent } from '../resources/gantt/gantt.component';
import { ProjectList } from '../resources/models/project.model';
import { GanttTasks } from '../resources/models/ganttTasks.model';

@Component({
  selector: 'app-rp',
  templateUrl: './rp.component.html',
  styleUrls: ['./rp.component.css']
})
export class RpComponent implements OnInit {
 @ViewChild(GanttComponent,{static:false}) child: GanttComponent;
  show: any;
  display: any;
  data : ProjectList[] = [];
  public newRes : any;
  tasks : GanttTasks[] = [];
  ngOnInit(){}
  checkChange(change){
    this.data.forEach(ele => {
      var newobj = [];
      ele.projects.forEach(element => {
        newobj.push({ id: element.project_code, name: element.project_name, start: element.start_date,
        end : element.end_date, progress:'20' });
        this.tasks = newobj;
    });
    });
    if(change == true)
    {
      this.child.reloadNew(this.tasks) ;
      this.show = true;

    }
    else{
      this.show = false;
    }
  }
  newProject(newRess)
  {
    this.newRes = newRess;
  }
  
  handleResults(res) {
    if (res) {
      this.display = true;
      this.data = res.newData     
    }
  }

}
