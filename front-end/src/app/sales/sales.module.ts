import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalesRoutingModule} from './sales-routing.module';
import {SalesComponent} from './components/sales/sales.component';
import {SalesItemComponent} from './components/sales-item/sales-item.component';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {SalesService} from "./services/sales.service";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    SalesComponent,
    SalesItemComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [SalesService]
})
export class SalesModule {
}
