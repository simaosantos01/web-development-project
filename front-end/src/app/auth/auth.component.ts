import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public email: string;
  public password: string;
  public name: string;

  public isAuthValid: boolean = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.authService.oauth({
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'Customer'
    })
      .subscribe({
        error: _ => this.isAuthValid = false
      })
  }

}
