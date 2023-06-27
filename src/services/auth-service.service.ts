import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    // Check if token exists in local storage during initialization
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    console.log('## Calling logout ##');

    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']); // Redirect to the login page after logout
  }
}
