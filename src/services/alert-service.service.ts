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
}
