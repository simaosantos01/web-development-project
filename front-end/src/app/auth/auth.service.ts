import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import jwt_decode from 'jwt-decode';

export interface AuthResponse {
  msg: string,
  method?: 'sign_in' | 'sign_up'
  token?: string
}

export interface Profile {
  reader_card_num?: number,
  employee_no?: number,
  email?: string,
  role?: string,
  customer_id?: string,
}

export interface OAuthParams {
  email: string,
  password: string,
  name?: string,
  role?: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private AUTH_URL = 'http://localhost:3000/api/auth'
  private HTTP_OPTIONS = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  oauth(body: OAuthParams): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.AUTH_URL, body, {
      headers: this.HTTP_OPTIONS
    }).pipe(tap(res => this.handleSession(res)))
  }

  logout() {
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") != null;
  }

  getProfile(): Profile {
    if (!this.isAuthenticated()) {
      return {};
    }

    const storage = localStorage.getItem("token")!;

    return jwt_decode<Profile>(storage);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['auth'])
      return false;
    }

    return true;
  }

  private handleSession(authResult: AuthResponse) {
    if (authResult.method === "sign_in") {
      localStorage.setItem("token", authResult.token!);
      this.router.navigate(['/']);
    }
  }
}
