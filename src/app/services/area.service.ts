import { Area } from './../model/area';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private REST_API_SERVER = environment.api;
  private ADD = this.REST_API_SERVER + 'Area/Add';
  private UPDATE = this.REST_API_SERVER + 'Area/update';
  private GET = this.REST_API_SERVER + 'Area/LoadTable';
  private DELETE = this.REST_API_SERVER + 'Area/delete';
  constructor(private httpClient: HttpClient) { }


  /* Manage Role Operations */
  _add_area(add: Area): Observable<Area>{
    return this.httpClient.post<Area>(`${this.ADD}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _update_area(add: Area): Observable<Area>{
    return this.httpClient.post<Area>(`${this.UPDATE}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _get_area(data): Observable<Area[]>{
    return this.httpClient.post<Area[]>(`${this.GET}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _delete_area(data): Observable<any>{
    return this.httpClient.post<any>(`${this.DELETE}`, data).pipe(
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
