import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REST_API_SERVER = environment.api;
  private ROLL_API = this.REST_API_SERVER + 'auth/LoadRoleTable';
  private CHECK_USER = this.REST_API_SERVER + 'auth/checkUsername';
  private CHECK_SUPER_USER = this.REST_API_SERVER + 'superauth/checkUsername';
  private CHECK_SUPER_PASSWORD = this.REST_API_SERVER + 'superauth/checkUsernameWithpassword';
  private CHECK_SUPER_LOGIN = this.REST_API_SERVER + 'superauth/loginSession';
  private CHECK_PASSWORD = this.REST_API_SERVER + 'auth/checkUsernameWithpassword';
  private LOGIN = this.REST_API_SERVER + 'auth/loginSession';
  private CHECK_SETUP = this.REST_API_SERVER + 'auth/Checksetup';
  private SETUP = this.REST_API_SERVER + 'auth/setup';
  private CHECK_BANK_CODE = this.REST_API_SERVER + 'auth/checkbankcode';
  constructor(private httpClient: HttpClient) { }

  _checsuperkUser(data): Observable<any>{
    return this.httpClient.post<any>(`${this.CHECK_SUPER_USER}`, data);
  }

  _checkbankcode(data): Observable<any>{
    return this.httpClient.post<any>(`${this.CHECK_BANK_CODE}`, data);
  }

  _checkSuperPassword(data): Observable<any>{
    return this.httpClient.post<any>(`${this.CHECK_SUPER_PASSWORD}`, data);
  }

  _loginSperSession(data): Observable<any>
  {
    return this.httpClient.post<any>(`${this.CHECK_SUPER_LOGIN}`, data);
  }
  _getRole(data): Observable<Role[]>{
    return this.httpClient.post<Role[]>(`${this.ROLL_API}`,data);
  }
  _checkUser(data): Observable<any>{
    return this.httpClient.post<any>(`${this.CHECK_USER}`, data);
  }
  _checkPassword(data): Observable<any>{
    return this.httpClient.post<any>(`${this.CHECK_PASSWORD}`, data);
  }
  _loginSession(data): Observable<any>
  {
    return this.httpClient.post<any>(`${this.LOGIN}`, data);
  }
  _check_new_setup(): Observable<any>{
    return this.httpClient.get<any>(`${this.CHECK_SETUP}`).pipe(
      catchError(this.handleError)
    );
  }

  _create_new_setup(data): Observable<any>{
    return this.httpClient.post<any>(`${this.SETUP}`, data);
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
