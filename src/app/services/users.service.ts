import { Users } from './../model/users';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private REST_API_SERVER = environment.api;
  private ADD_USERS = this.REST_API_SERVER + 'Users/Add';
  private ADD_UPDATE = this.REST_API_SERVER + 'Users/update';
  private GET_USERS_TABLE = this.REST_API_SERVER + 'Users/LoadTable';
  private DELETE_USERS = this.REST_API_SERVER + 'Users/delete';
  constructor(private httpClient: HttpClient) { }

  /* Manage Role Operations */
  _add_branch(add: Users): Observable<Users>{
    return this.httpClient.post<Users>(`${this.ADD_USERS}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _update_branch(add: Users): Observable<Users>{
    return this.httpClient.post<Users>(`${this.ADD_UPDATE}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _get_branch(): Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${this.GET_USERS_TABLE}`).pipe(
      catchError(this.handleError)
    );
  }
  _delete_branch(data): Observable<any>{
    return this.httpClient.post<any>(`${this.DELETE_USERS}`, data).pipe(
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
