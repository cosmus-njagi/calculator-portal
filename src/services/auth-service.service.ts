import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() {}

  login(username: string, password: string): boolean {
    // Perform authentication logic
    // If authentication is successful, set isAuthenticated to true
    // Otherwise, set it to false
    this.isAuthenticated = true; // Placeholder logic

    return this.isAuthenticated;
  }

  logout(): void {
    // Perform logout logic
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
