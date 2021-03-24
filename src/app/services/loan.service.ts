import { Survey } from '../model/survey';
import { Area } from '../model/area';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private REST_API_SERVER = environment.api;
  private GET = this.REST_API_SERVER + 'Loans/LoadTable';
  private GET_SINGLE = this.REST_API_SERVER + 'Loans/get_single_record';
  constructor(private httpClient: HttpClient) { }


 
  _get_loans(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_single_loans(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_SINGLE}`,data).pipe(
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
