import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttComponent } from './gantt/gantt.component';
import { EmployeetableComponent } from './employeetable/employeetable.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DemoComponent } from './demo/demo.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ResorcePlanningApi } from 'src/common/swagger-providers/rp-api.provider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
@NgModule({
  declarations: [GanttComponent, EmployeetableComponent, DemoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule

  ],
  exports: [
    GanttComponent,
    EmployeetableComponent,
    DemoComponent
  ],
  providers: [ ResorcePlanningApi]
})
export class ResourcesModule { }
