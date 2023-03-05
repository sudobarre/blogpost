import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { StorageService } from '../_services/storage.service';
import { LoginResponse } from '../login/login-response.payload';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiKey + '/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.http
      .post<LoginResponse>(
        AUTH_API + '/login',
        loginRequestPayload,
        httpOptions
      )
      .pipe(
        map((data) => {
          this.storageService.set('username', data.username);
          this.storageService.set('roles', data.roles);
          this.storageService.set('email', data.email);
          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }


  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(
      AUTH_API + '/signup',
      signupRequestPayload,
      {responseType: 'text'}
    );
  }

  logout():  Observable<any> {
    return this.http.post(AUTH_API + '/logout', { }, httpOptions);
  }

  refreshToken():  Observable<any> {
    return this.http.post(AUTH_API + '/refreshtoken', { }, httpOptions);
  }

}
