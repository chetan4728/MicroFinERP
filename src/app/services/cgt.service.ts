
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CGTService {
  private REST_API_SERVER = environment.api;
  private GET = this.REST_API_SERVER + 'CGT/LoadTable';
  private GET_HIGH_MARK = this.REST_API_SERVER + 'CGT/get_high_mark_list';
  private applicationFormPDF = this.REST_API_SERVER + 'CGT/applicationFormPDF';
  
  constructor(private httpClient: HttpClient) { }


  get_high_mark_list(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_HIGH_MARK}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_cgt(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_app_form(data): Observable<String>{
    return this.httpClient.post<String>(`${this.applicationFormPDF}`,data).pipe(
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
