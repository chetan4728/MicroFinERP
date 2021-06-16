import { Users } from './../model/users';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private REST_API_SERVER = environment.api;
  private ADD_USERS = this.REST_API_SERVER + 'Users/Add';
  private UPLOAD_PHOTO = this.REST_API_SERVER + 'Users/upload_photo';
  private ADD_UPDATE = this.REST_API_SERVER + 'Users/update';
  private GET_USERS_TABLE = this.REST_API_SERVER + 'Users/LoadTable';
  private GET_USERS_DETAILS = this.REST_API_SERVER + 'Users/get_user_details';
  private DELETE_USERS = this.REST_API_SERVER + 'Users/delete';
  constructor(private httpClient: HttpClient) { }

  /* Manage Role Operations */
   _upload_photo(form, id): Observable<Users>{
    const formData: any = new FormData();
    formData.append('profile', form.get('profile').value);
    formData.append('employee_id', id);
    return this.httpClient.post<Users>(`${this.UPLOAD_PHOTO}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  _add_user(form: Users): Observable<Users>{
    return this.httpClient.post<Users>(`${this.ADD_USERS}`, form);
  }
  _update_branch(add: Users): Observable<Users>{
    return this.httpClient.post<Users>(`${this.ADD_UPDATE}`, add).pipe(
      catchError(this.handleError)
    );
  }
  _get_users(data): Observable<Users[]>{
    return this.httpClient.post<Users[]>(`${this.GET_USERS_TABLE}`,data).pipe(
      catchError(this.handleError)
    );
  }
  _get_user_details(data): Observable<Users>{
    return this.httpClient.post<Users>(`${this.GET_USERS_DETAILS}`, data).pipe(
      catchError(this.handleError)
    );
  }
  _delete_branch(data): Observable<any>{
    return this.httpClient.post<any>(`${this.DELETE_USERS}`, data).pipe(
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
