
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
  _get_branch(data): Observable<Branch[]>{
    return this.httpClient.post<Branch[]>(`${this.GET_BRANCH_TABLE}`, data).pipe(
      catchError(this.handleError)
    );
  }
  _delete_branch(data): Observable<any>{
    return this.httpClient.post<any>(`${this.DELETE_BRANCH}`, data).pipe(
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
