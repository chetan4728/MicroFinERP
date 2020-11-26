import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DropDownsService {
  private REST_API_SERVER = environment.api;
  private GET_STATE_DP = this.REST_API_SERVER + 'dp/GetStates';
  private GET_DISTRICT_DP = this.REST_API_SERVER + 'dp/GetDistricts';
  private ROLL_API = this.REST_API_SERVER + 'roles/LoadRoleTable';
  private GET_BRANCH_TABLE = this.REST_API_SERVER + 'Branch/LoadTable';
  constructor(private httpClient: HttpClient) { }

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
  _getRole(): Observable<any>{
    return this.httpClient.get<any>(`${this.ROLL_API}`).pipe(
      catchError(this.handleError)
    );
  }
  _get_branch(): Observable<any>{
    return this.httpClient.get<any>(`${this.GET_BRANCH_TABLE}`).pipe(
      catchError(this.handleError)
    );
  }
  private handleError <T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
 }
}
