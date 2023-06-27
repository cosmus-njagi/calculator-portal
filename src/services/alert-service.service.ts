import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  public titlelessWarning(notification: any): void {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      text: notification,
      showConfirmButton: true,
      confirmButtonText: 'Close',
      allowOutsideClick: false,
    });
  }

  public sendEmail() {
    Swal.fire({
      title: 'Enter your email',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Send mail',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Email sent Successfully',
          icon: 'success',
          confirmButtonText: 'Close',
        });
      }
    });
  }
}
