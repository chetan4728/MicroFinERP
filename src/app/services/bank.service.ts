import { Area } from './../model/area';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from 'angular-web-storage';


@Injectable({
  providedIn: 'root'
})
export class BankService {
  private REST_API_SERVER = environment.api;
  private UPDATE = this.REST_API_SERVER + 'Bank/update';
  private GET = this.REST_API_SERVER + 'Bank/LoadTable';
  private GETALLBANKS = this.REST_API_SERVER + 'Bank/LoadAllbanks';
  private GETLOANINTTYPE = this.REST_API_SERVER + 'Bank/int_type';
  private ADD_BANK = this.REST_API_SERVER + 'Bank/addBank';
  private DEL_BANK = this.REST_API_SERVER + 'Bank/delBank';
  private UPLOAD_PHOTO = this.REST_API_SERVER + 'Bank/upload_photo';
  SessionData: any;
  constructor(public local: LocalStorageService, private httpClient: HttpClient) {
    this.SessionData = this.local.get(environment.userSession);
   }

  _delete_bank(obj): Observable<String>{
    const headers = new HttpHeaders()
    .set('Authorization',  this.SessionData.token)
    .set('Content-Type', 'application/json')
    return this.httpClient.post<any>(`${this.DEL_BANK}`, obj,{headers}).pipe(
      catchError(this.handleError)
    );
  
  }

  _get_bank_intrest(): Observable<String>{
    return this.httpClient.get<String>(`${this.GETLOANINTTYPE}`).pipe(
      catchError(this.handleError)
    );
  }

  _upload_photo(form, id): Observable<String>{
    const formData: any = new FormData();
    formData.append('bank_logo', form.get('bank_logo').value);
    formData.append('bank_id', id);
    return this.httpClient.post<String>(`${this.UPLOAD_PHOTO}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  _add_user(form): Observable<String>{
    return this.httpClient.post<String>(`${this.ADD_BANK}`, form);
  }


  _getallbanks(): Observable<String>{
    return this.httpClient.get<String>(`${this.GETALLBANKS}`).pipe(
      catchError(this.handleError)
    );
  }
  /* Manage Role Operations */
  
  _update(data): Observable<any>{

    return this.httpClient.post<String>(`${this.UPDATE}`, data).pipe(
      catchError(this.handleError)
    );

    
  }
  _get(data): Observable<any>{
    return this.httpClient.post<any>(`${this.GET}`,data).pipe(
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
