import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SideNavService} from "./side-nav.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav') public sidenav?: MatSidenav;

  constructor(private sideNavService: SideNavService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sidenav && this.sideNavService.setSidenav(this.sidenav);
  }
}
