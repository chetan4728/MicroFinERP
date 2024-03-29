import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private REST_API_SERVER = environment.api;
  private GET = this.REST_API_SERVER + 'Employee/get_employee_list';
  private GET_CSR = this.REST_API_SERVER + 'Employee/get_csr_list';
  private GET_GROUPS = this.REST_API_SERVER + 'Employee/get_employee_groups';
  constructor(private httpClient: HttpClient) { }

  get_employee_groups(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUPS}`,data).pipe(
      catchError(this.handleError)
    );
  }

  get_employee_list(): Observable<String>{
    return this.httpClient.get<String>(`${this.GET}`).pipe(
      catchError(this.handleError)
    );
  }

  get_csr_list(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_CSR}`,data).pipe(
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
