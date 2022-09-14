import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'

//Styles
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Routes
import {AppRoutingModule} from './app-routing.module';

//Global Modules
import {SharedModule} from './shared/shared.module';

//Global Services
import {SearchBarService} from './shared/components/nav/searchbar.service';

const angularModules = [
  HttpClientModule,
  BrowserAnimationsModule,
  BrowserModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...angularModules,
    NgbModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [SearchBarService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
