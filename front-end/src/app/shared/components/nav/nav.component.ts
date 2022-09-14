import {Component, OnInit} from '@angular/core';
import {SideNavService} from '../side-nav/side-nav.service';
import {SearchBarService} from './searchbar.service';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private sideNavService: SideNavService,
    private searchBarService: SearchBarService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  clickMenu() {
    this.sideNavService.toggle();
  }

  onSearchTextChanged(searched: string) {
    document.getElementById('books-table')?.scrollIntoView();
    this.searchBarService.changeMessage(searched);
  }

  onLogout() {
    this.isAuthenticated = false;
    this.authService.logout();
  }

  onAccount() {
    this.router.navigate(['customer'])
  }
}
