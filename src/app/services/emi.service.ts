import { Area } from './../model/area';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EmiService {
  private REST_API_SERVER = environment.api;

  private GET = this.REST_API_SERVER + 'Emi/LoadTable';

  private GET_SINGLE = this.REST_API_SERVER + 'Loans/get_single_record';
  private GET_BRANCH_TABLE = this.REST_API_SERVER + 'Branch/LoadTable';
  private GET_AREA = this.REST_API_SERVER + 'Area/LoadTable';
  private GET_CENTERS = this.REST_API_SERVER + 'Centers/LoadCentersFromArea';
  private GET_GROUPS = this.REST_API_SERVER + 'Groups/LoadGroupsFromcenter';
  private GET_FILTER = this.REST_API_SERVER + 'Loans/LoadFilterTable';
  private UPDATE_STATUS = this.REST_API_SERVER + 'Loans/Update_status';
  private GET_GROUP_DETAILS = this.REST_API_SERVER + 'Disbursement/LoadTable';
  private GET_GROUP_MEMBERS = this.REST_API_SERVER + 'Emi/LoadLoanMembers';
  private get_loan_distribution_files = this.REST_API_SERVER + 'Disbursement/get_loan_distribution_files';
  constructor(private httpClient: HttpClient) { }

  _get_loan_distribution_applications(data): Observable<String>{
    return this.httpClient.post<String>(`${this.get_loan_distribution_files}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_group_members(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUP_MEMBERS}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_group_details(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUP_DETAILS}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_loans(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_loans_filter(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_FILTER}`,data).pipe(
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
  _Update_Status(data): Observable<String>{
    return this.httpClient.post<String>(`${this.UPDATE_STATUS}`,data).pipe(
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

  _get_listing(data): Observable<Area[]>{
    return this.httpClient.post<Area[]>(`${this.GET}`,data).pipe(
      catchError(this.handleError)
    );
  }
 
  
}
