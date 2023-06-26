import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = environment.url.base;
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    // You can customize the error handling based on your requirements
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  get<T>(endpoint: string, options?: object): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      ...options,
    };

    return this.http
      .get<T>(url, requestOptions)
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, data: any, options?: object): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      ...options,
    };

    return this.http
      .post<T>(url, data, requestOptions)
      .pipe(catchError(this.handleError));
  }

  postWithHeaders<T>(
    endpoint: string,
    data: any,
    options?: object
  ): Observable<T> {
    const token = localStorage.getItem('token');
    console.log('token ##', token);
    const url = `${this.apiUrl}/${endpoint}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
      ...options,
    };

    return this.http
      .post<T>(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
