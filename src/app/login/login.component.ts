import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/services/alert-service.service';
import { ApiService } from 'src/services/api-service.service';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  //toggle password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submitLogin() {
    console.log(this.signInForm.value);
    const endpoint = environment.url.login;
    const data = this.signInForm.value;
    this.apiService.post(endpoint, data).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response['returnCode'] === '00') {
          // Handle successful response
          console.log('re-directing to dashboard');
          this.authService.login(response.message);
          try {
            this.router.navigate(['/dashboard']); // Redirect to the dashboard
          } catch (error) {
            console.log(error);
          }
        }
        if (response['returnCode'] === '01') {
          // Handle error response
          this.alertService.titlelessWarning(response['message']);
        }
      },
      error: (error: any) => {
        // Handle error
        console.log(error);
        this.alertService.titlelessWarning('Internal error occurred');
      },
    });
  }
}
