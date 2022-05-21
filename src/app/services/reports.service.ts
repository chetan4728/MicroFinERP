
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private REST_API_SERVER = environment.api;
  private GET_DAILY_BALANCE_REPORT = this.REST_API_SERVER + 'Reports/get_daily_balance_report';
  private GET_COLLECTION_SHEET = this.REST_API_SERVER + 'Reports/get_collection_sheet';
  private GET_COLLECTION_BALANCE_SHEET = this.REST_API_SERVER + 'Reports/CollectionSheetData';
  private GET_COLLECTION_SHEET_GROUP_BY = this.REST_API_SERVER + 'Reports/get_collection_data_group_by'; 
  private GET_MONTH_DEMAND_REPORT = this.REST_API_SERVER + 'Reports/get_month_demand_report';
  private GET_LOAN_COLLECTION_REPORT = this.REST_API_SERVER + 'Reports/get_loan_collection_report';
  private GET_COLLECTION_REPORT = this.REST_API_SERVER + 'Reports/get_collection_report';
  
  constructor(private httpClient: HttpClient) { }

  get_daily_balance_report(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_DAILY_BALANCE_REPORT}`,data).pipe(
      catchError(this.handleError)
    );
  }

  get_month_demand_report(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_MONTH_DEMAND_REPORT}`,data).pipe(
      catchError(this.handleError)
    );
  }

  get_loan_collection_report(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_LOAN_COLLECTION_REPORT}`,data).pipe(
      catchError(this.handleError)
    );
  }

  get_collection_report(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_COLLECTION_REPORT}`,data).pipe(
      catchError(this.handleError)
    );
  }

  get_collection_balance_sheet(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_COLLECTION_BALANCE_SHEET}`,data).pipe(
      catchError(this.handleError)
    );
  }

  get_collection_data_group_by(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_COLLECTION_SHEET_GROUP_BY}`,data).pipe(
      catchError(this.handleError)
    );
  }

  get_collection_sheet(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_COLLECTION_SHEET}`,data).pipe(
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
