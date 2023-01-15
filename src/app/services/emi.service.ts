import { Area } from './../model/area';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';


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
  private UPDATE_APPROVED_STATUS = this.REST_API_SERVER + 'Emi/update_approved_status';
  private UPDATE_PRECLOSE = this.REST_API_SERVER + 'Emi/updatePreclose';
  private GET_GROUP_DETAILS = this.REST_API_SERVER + 'Disbursement/LoadTable';
  private GET_GROUP_MEMBERS = this.REST_API_SERVER + 'Emi/LoadLoanMembers';
  private GET_GROUP_MEMBERS_EMI = this.REST_API_SERVER + 'Emi/LoadLoanMembersEmi'; 
  private get_loan_emi_data = this.REST_API_SERVER + 'Disbursement/get_loan_emi_data';
  private get_recovery_loan_emi_data = this.REST_API_SERVER + 'Disbursement/get_recovery_loan_emi_data';

  
  constructor(private httpClient: HttpClient) { }

  update_preclose(data): Observable<String>{
    return this.httpClient.post<String>(`${this.UPDATE_PRECLOSE}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_loan_emi_data(data): Observable<String>{
    return this.httpClient.post<String>(`${this.get_loan_emi_data}`,data).pipe(
      catchError(this.handleError)
    );
  }
  
  _get_recovery_loan_emi_data(data): Observable<String>{
    return this.httpClient.post<String>(`${this.get_recovery_loan_emi_data}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_group_members(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUP_MEMBERS}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_group_members_emi(data): Observable<String>{
    return this.httpClient.post<String>(`${this.GET_GROUP_MEMBERS_EMI}`,data).pipe(
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
  _Update_Status(data): Observable<String>{
    return this.httpClient.post<String>(`${this.UPDATE_STATUS}`,data).pipe(
      catchError(this.handleError)
    );
  }
  update_approved_status(data): Observable<String>{
    return this.httpClient.post<String>(`${this.UPDATE_APPROVED_STATUS}`,data).pipe(
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

  _get_listing(data): Observable<Area[]>{
    return this.httpClient.post<Area[]>(`${this.GET}`,data).pipe(
      catchError(this.handleError)
    );
  }
 
  
}
