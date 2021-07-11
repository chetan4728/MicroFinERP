
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CentersService {
  private REST_API_SERVER = environment.api;

  private GET = this.REST_API_SERVER + 'Centers/LoadTable';
  private DELETE = this.REST_API_SERVER + 'Centers/delete';
  constructor(private httpClient: HttpClient) { }



  _get_centers(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET}`,data).pipe(
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
