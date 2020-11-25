
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Branch } from '../model/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private REST_API_SERVER = environment.api;
  private ADD_BRANCH = this.REST_API_SERVER + 'Branch/Add';
  private update = this.REST_API_SERVER + 'Branch/update';
  private GET_BRANCH_TABLE = this.REST_API_SERVER + 'Branch/LoadTable';
  private DELETE_BRANCH = this.REST_API_SERVER + 'Branch/delete';
  constructor(private httpClient: HttpClient) { }


  /* Manage Role Operations */
  _add_branch(add: Branch): Observable<Branch>{
    return this.httpClient.post<Branch>(`${this.ADD_BRANCH}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _update_branch(add: Branch): Observable<Branch>{
    return this.httpClient.post<Branch>(`${this.update}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _get_branch(): Observable<Branch[]>{
    return this.httpClient.get<Branch[]>(`${this.GET_BRANCH_TABLE}`).pipe(
      catchError(this.handleError)
    );
  }
  _delete_branch(data): Observable<any>{
    return this.httpClient.post<any>(`${this.DELETE_BRANCH}`, data).pipe(
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
