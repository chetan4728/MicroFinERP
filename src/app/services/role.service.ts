import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private REST_API_SERVER = environment.api;
  private ROLL_API = this.REST_API_SERVER + 'roles/LoadRoleTable';
  private ADD_ROLL_API = this.REST_API_SERVER + 'roles/AddRole';
  private UPDATE_ROLL_API = this.REST_API_SERVER + 'roles/UpdateRole';
  private DELETE_ROLL_API = this.REST_API_SERVER + 'roles/DeleteRole';
  constructor(private httpClient: HttpClient) { }


  /* Manage Role Operations */
  _add_role(add: Role): Observable<Role>{
    return this.httpClient.post<Role>(`${this.ADD_ROLL_API}`, add).pipe(
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
    return this.httpClient.get<Role[]>(`${this.ROLL_API}`).pipe(
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
