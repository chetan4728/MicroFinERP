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
  private GET_BRANCH_TABLE = this.REST_API_SERVER + 'Branch/LoadTable';
  private GET_AREA = this.REST_API_SERVER + 'Area/LoadTable';
  private GET_CENTERS = this.REST_API_SERVER + 'Centers/LoadCentersFromArea';
  private GET_GROUPS = this.REST_API_SERVER + 'Groups/LoadGroupsFromcenter';
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
  _get_branch(): Observable<String>{
    return this.httpClient.get<String>(`${this.GET_BRANCH_TABLE}`).pipe(
      catchError(this.handleError)
    );
  }
  _get_centers(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_CENTERS}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_groups(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUPS}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_area(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_AREA}`,data).pipe(
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
