import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent } from './resources/gantt/gantt.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(GanttComponent,{static:false}) child: GanttComponent;
  show: any;
  sss: any;
  ress: any;
  splitter;
  a;
  public data = [];
  aa : any [] ;
  public clickedEvent: Event;
  public clickedIndex: any;
  public index: any
  public newRes : any;
  tasks = [];
  // tasks =[ {
  //   custom_index: 0,
  //   id: "some-udid-a",
  //   name: "task-A",
  //   start: "2021-12-12",
  //   end: "2022-12-12",
  //   progress: 0,
  //   dependencies: ''
  //  },{
  //   custom_index: 0,
  //   id: "some-udid-b",
  //   name: "task-B",
  //   start: "2020-12-12",
  //   end: "2021-12-12",
  //   progress: 0,
  //   dependencies: ''
  //  },{
  //   custom_index: 1,
  //   id: "some-udid-a",
  //   name: "task-C",
  //   start: "2020-12-12",
  //   end: "2020-12-18",
  //   progress: 0,
  //   dependencies: ''
  //  }];
  ngOnInit() {

  }
  ngOnChanges() {

  }
  checkChange(change){
console.log("sss",this.data)
    for( var i =0; i<this.data.length;i++)
    {
      var newobj = [];
      this.data[i].projects.forEach(element => {
        newobj.push({ id: element.project_code, name: element.project_name, start: element.start_date,
        end : element.end_date, progress:'20' });
        this.tasks = newobj;
    });
    }
    console.log(change);
    if(change == true)
    {
      console.log("hiiii",this.data);
      console.log(this.child)
      this.child.reloadNew(this.tasks) ;
      this.show = true;

    }
    else{
      this.show = false;
      console.log("byeee")
    }
  }
  newProject(newRess)
  {
    this.newRes = newRess;
    console.log(this.newRes);
  }
  childEventClicked(event: Event) {

    this.clickedEvent = event;
    // this.a = !this.clickedEvent;
    console.log('event click', this.clickedEvent);
    // if(this.clickedEvent)
    // {
    //   this.show = true
    // }
  }
  getIndex(indexx) {
    this.clickedIndex = indexx;
    console.log('INDEXXXX',indexx);

  }
  handleResults(res) {
    console.log('handle result', res)
    if (res) {
      // this.show = true;
      this.sss = true;
      
      console.log("ressss",this.sss)
      // console.log(res.idd)
      this.aa = res.a
      // this.aa.forEach(element => {
      //   console.log(this.aa)
      //   console.log("show before", this.show)
      //   console.log('element', element.id)
      //   console.log('Index', this.clickedIndex)
      //   console.log('Indexxxx:::',this.clickedIndex)
      //   if ((element.id === res.idd)) {
      //       this.show = true;
      //       console.log(this.show);
      //   }
      //   else {
      //     this.show = false;
      //   }
        // this.show[element.id] = ! this.show[element.id];
        // this.show[res.id] = !this.show;
        this.data = this.aa;
      // })
     
    }
  }
}