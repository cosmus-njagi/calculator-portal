import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/services/api-service.service';

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
    private apiService: ApiService
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
      next: (response) => {
        // Handle the successful response
        console.log(response);
      },
      error: (error) => {
        // Handle the error
        console.error(error);
      },
    });
  }
}
