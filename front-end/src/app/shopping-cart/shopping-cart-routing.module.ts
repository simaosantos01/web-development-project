import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PurchasesService } from '../shared/services/purchases.service';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PurchasesService],
})
export class ShoppingCartRoutingModule {}
