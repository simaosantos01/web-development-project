import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';

//Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StockPopupComponent } from './components/stock-popup/stock-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [MatSliderModule, MatIconModule, MatButtonModule, MatDialogModule];

@NgModule({
  declarations: [ShoppingCartComponent, StockPopupComponent],
  imports: [...materialModules, CommonModule, ShoppingCartRoutingModule],
})
export class ShoppingCartModule {}
