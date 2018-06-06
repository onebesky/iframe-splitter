import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularSplitModule } from 'angular-split';

import { AppComponent } from './app.component';
import { SetupSplitterComponent } from './setup-splitter/setup-splitter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplaySplitterComponent } from './display-splitter/display-splitter.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupSplitterComponent,
    NavbarComponent,
    DisplaySplitterComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
