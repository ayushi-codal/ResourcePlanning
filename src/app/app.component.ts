import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  show: any ;
  ress: any;
  splitter;
  a;
  title = 'ResourcePlanning';
  public data = [];
  aa : any [] ;
  public clickedEvent: Event;
  public clickedIndex: any;
  public index: any
  public newRes : any;
  ngOnInit() {

  }
  ngOnChanges() {

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
      console.log(res.idd)
      this.aa = res.a
      this.aa.forEach(element => {
        console.log(this.aa)
        console.log("show before", this.show)
        console.log('element', element.id)
        console.log('Index', this.clickedIndex)
        console.log('Indexxxx:::',this.clickedIndex)
        if ((element.id === res.idd)) {
            this.show = !this.show;
            console.log(this.show);
        }
        else {
          this.show = false;
        }
        console.log("show after", this.show)
        // this.show[element.id] = ! this.show[element.id];
        // this.show[res.id] = !this.show;
        this.data = this.aa;
        console.log(this.data[0].id);
      })
     
    }
  }
}