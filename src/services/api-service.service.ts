import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';
import { AlertService } from './alert-service.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = environment.url.base;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 403 || error.status === 401) {
        this.alertService.titlelessWarning('Token expired. Login to proceed');
        this.authService.logout();
      }
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

  sendEmailWithAttachment(
    to: string,
    subject: string,
    text: string,
    attachment: File,
    endpoint: string,
    options?: object
  ): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
      ...options,
    };

    const formData: FormData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('text', text);
    formData.append('attachment', attachment);

    return this.http.post(url, formData, httpOptions);
  }
}
