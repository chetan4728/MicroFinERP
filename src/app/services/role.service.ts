import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private REST_API_SERVER = environment.api;
  private ROLL_API = this.REST_API_SERVER + 'roles/LoadRoleTable/';
  private ADD_ROLL_API = this.REST_API_SERVER + 'roles/AddRole/';
  private UPDATE_ROLL_API = this.REST_API_SERVER + 'roles/UpdateRole/';
  private DELETE_ROLL_API = this.REST_API_SERVER + 'roles/DeleteRole/';
  SessionData: any ;
  constructor(public local: LocalStorageService, private httpClient: HttpClient) {
    this.SessionData = this.local.get(environment.userSession);
   }


  /* Manage Role Operations */
  _add_role(add: Role): Observable<Role>{
    return this.httpClient.post<Role>(`${this.ADD_ROLL_API + this.SessionData.token}`, add).pipe(
      catchError(this.handleError)
    );
  }

   _update_role(update: Role): Observable<Role>{
    return this.httpClient.post<Role>(`${this.UPDATE_ROLL_API}`, update).pipe(
      catchError(this.handleError)
    );
  }
  _delete_role(data): Observable<any>{
    return this.httpClient.post<any>(`${this.DELETE_ROLL_API}`, data).pipe(
      catchError(this.handleError)
    );
  }

  _getRole(): Observable<Role[]>{
    const headers = new HttpHeaders()
    .set('Authorization',  this.SessionData.token)
    .set('Content-Type', 'application/json')
    return this.httpClient.get<Role[]>(`${this.ROLL_API}`, {headers}).pipe(
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
