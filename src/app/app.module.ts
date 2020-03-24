import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ResourcesModule } from 'src/app/resources/resources.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSplitModule } from 'angular-split';
import { ResorcePlanningApi } from 'src/common/swagger-providers/rp-api.provider';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ResourcesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularSplitModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
