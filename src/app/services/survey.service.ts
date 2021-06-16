import { Survey } from './../model/survey';
import { Area } from '../model/area';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private REST_API_SERVER = environment.api;
  private ADD = this.REST_API_SERVER + 'Survey/Add';
  private UPDATE = this.REST_API_SERVER + 'Survey/update';
  private GET = this.REST_API_SERVER + 'Survey/LoadTable';
  private ROW = this.REST_API_SERVER + 'Survey/GetSurveryArea';
  private getAreaSurveys = this.REST_API_SERVER + 'Survey/AreaSurveys';
  private getappSurveys = this.REST_API_SERVER + 'Survey/getappSurveys';
  private DELETE = this.REST_API_SERVER + 'Survey/delete';
  constructor(private httpClient: HttpClient) { }


  /* Manage Role Operations */
  _add_survey(add: Survey): Observable<Survey>{
    return this.httpClient.post<Survey>(`${this.ADD}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _update_survey(add: Survey): Observable<Survey>{
    return this.httpClient.post<Survey>(`${this.UPDATE}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _get_survey(data): Observable<Survey[]>{
    return this.httpClient.post<Survey[]>(`${this.GET}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _get_app_survey(data): Observable<Survey[]>{
    return this.httpClient.post<Survey[]>(`${this.getappSurveys}`,data).pipe(
      catchError(this.handleError)
    );
  }
  

  _get_survey_row(data): Observable<Survey[]>{
    return this.httpClient.post<Survey[]>(`${this.ROW}`,data).pipe(
      catchError(this.handleError)
    );
  }

  _getAreaSurveys(data): Observable<any>{
    return this.httpClient.post<any>(`${this.getAreaSurveys}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _delete_survey(data): Observable<Survey>{
    return this.httpClient.post<Survey>(`${this.DELETE}`, data).pipe(
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
