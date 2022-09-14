import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NavComponent} from "./components/nav/nav.component";
import {SideNavComponent} from "./components/side-nav/side-nav.component";

// Material
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {NgMatSearchBarModule} from 'ng-mat-search-bar';
import {MatSliderModule} from "@angular/material/slider";

// Angular
import {RouterModule} from "@angular/router";

// Services
import {SideNavService} from "./components/side-nav/side-nav.service";

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
]

@NgModule({
  declarations: [NavComponent, SideNavComponent],
  exports: [
    NavComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...materialModules,
    NgMatSearchBarModule,
    MatSliderModule
  ],
  providers: [SideNavService, MatSidenav]
})
export class SharedModule {
}
