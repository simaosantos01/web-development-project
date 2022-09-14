import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SalesComponent} from "./components/sales/sales.component";
import {SalesItemComponent} from "./components/sales-item/sales-item.component";

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'item',
        component: SalesItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {
}
