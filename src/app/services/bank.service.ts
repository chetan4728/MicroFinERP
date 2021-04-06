import { Area } from './../model/area';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class BankService {
  private REST_API_SERVER = environment.api;
  private UPDATE = this.REST_API_SERVER + 'Bank/update';
  private GET = this.REST_API_SERVER + 'Bank/LoadTable';
  
  constructor(private httpClient: HttpClient) { }


  /* Manage Role Operations */
  
  _update(add: Area): Observable<Area>{
    return this.httpClient.post<Area>(`${this.UPDATE}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _get(data): Observable<Area[]>{
    return this.httpClient.post<Area[]>(`${this.GET}`,data).pipe(
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
