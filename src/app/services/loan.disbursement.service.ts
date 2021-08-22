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
export class LoanDisbursementService {
  private REST_API_SERVER = environment.api;
  private GET = this.REST_API_SERVER + 'Loans/LoadTable';
  private GET_SINGLE = this.REST_API_SERVER + 'Loans/get_single_record';
  private GET_BRANCH_TABLE = this.REST_API_SERVER + 'Branch/LoadTable';
  private GET_AREA = this.REST_API_SERVER + 'Area/LoadTable';
  private GET_CENTERS = this.REST_API_SERVER + 'Centers/LoadCentersFromArea';
  private GET_GROUPS = this.REST_API_SERVER + 'Groups/LoadGroupsFromcenter';
  private GET_FILTER = this.REST_API_SERVER + 'Loans/LoadFilterTable';
  private GET_GROUP_DETAILS = this.REST_API_SERVER + 'Disbursement/LoadTable';
  private UPDATE_BLC_STATUS = this.REST_API_SERVER + 'Disbursement/update_blc_status';
  private GET_GROUP_MEMBERS = this.REST_API_SERVER + 'Disbursement/LoadLoanMembers';
  private GET_GROUP_APPROVED_MEMBERS = this.REST_API_SERVER + 'Disbursement/LoadLoanApprovedMembers';
  private create_loan_distribution = this.REST_API_SERVER + 'Loans/create_loan_distribution';
  private create_loan_distribution_blc = this.REST_API_SERVER + 'Loans/create_loan_distribution_blc';
  private get_loan_distribution_files = this.REST_API_SERVER + 'Disbursement/get_loan_distribution_files';
  private get_loan_distribution_files_edit = this.REST_API_SERVER + 'Disbursement/get_loan_distribution_files_edit';
  constructor(private httpClient: HttpClient) { }

  _update_blc_status(data)
  {
    return this.httpClient.post<String>(`${this.UPDATE_BLC_STATUS}`,data).pipe(
      catchError(this.handleError)
    );

    
  }
  _create_loan_distribution(data): Observable<String>{
    return this.httpClient.post<String>(`${this.create_loan_distribution}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _create_Blc_loan_distribution(data): Observable<String>{
    return this.httpClient.post<String>(`${this.create_loan_distribution_blc}`,data).pipe(
      catchError(this.handleError)
    );
  }
 
  _get_loan_distribution_applications(data): Observable<String>{
    return this.httpClient.post<String>(`${this.get_loan_distribution_files}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_loan_distribution_applications_data(data): Observable<String>{
    return this.httpClient.post<String>(`${this.get_loan_distribution_files_edit}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_loans(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_group_members(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUP_MEMBERS}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_approved_group_members(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUP_APPROVED_MEMBERS}`,data).pipe(
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
  _get_branch(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_BRANCH_TABLE}`,data).pipe(
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

  _get_group_details(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUP_DETAILS}`,data).pipe(
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
