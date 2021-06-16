import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class DropDownsService {
  private REST_API_SERVER = environment.api;
  private GET_STATE_DP = this.REST_API_SERVER + 'dp/GetStates';
  private GET_DISTRICT_DP = this.REST_API_SERVER + 'dp/GetDistricts';
  private ROLL_API = this.REST_API_SERVER + 'roles/LoadRoleTable';
  private GET_BRANCH_TABLE = this.REST_API_SERVER + 'Branch/LoadTable';
  private GET_EMPLOYEE_DATA_BRANCH = this.REST_API_SERVER + 'dp/GetEmployeeByBranch';
  SessionData: any;
  constructor(public local: LocalStorageService,private httpClient: HttpClient) { 
    this.SessionData = this.local.get(environment.userSession);
  }

  _getStats(): Observable<any>{
    return this.httpClient.get<any>(`${this.GET_STATE_DP}`).pipe(
      catchError(this.handleError)
    );
  }
  getDistricts(data): Observable<any>{
    return this.httpClient.post<any>(`${this.GET_DISTRICT_DP}`, data).pipe(
      catchError(this.handleError)
    );
  }
  _getRole(data): Observable<any>{
    const headers = new HttpHeaders()
    .set('Authorization',  this.SessionData.token)
    .set('Content-Type', 'application/json')
    return this.httpClient.post<any>(`${this.ROLL_API}`,data,{headers}).pipe(
      catchError(this.handleError)
    );
  }
  _get_branch(data): Observable<any>{
    return this.httpClient.post<any>(`${this.GET_BRANCH_TABLE}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_branch_employee(data): Observable<any>{
    return this.httpClient.post<any>(`${this.GET_EMPLOYEE_DATA_BRANCH}`,data).pipe(
      catchError(this.handleError)
    );
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
