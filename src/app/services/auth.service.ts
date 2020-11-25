import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {  throwError, of, Observable  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Role } from 'src/app/model/role';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REST_API_SERVER = environment.api;
  private ROLL_API = this.REST_API_SERVER + 'roles/LoadRoleTable';

  constructor(private httpClient: HttpClient) { }

  _getRole(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(`${this.ROLL_API}`).pipe(
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
