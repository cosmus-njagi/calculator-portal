import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private ngxLoaderService: NgxUiLoaderService) {}

  showLoader(loaderId: string = 'default'): void {
    console.log('starting loader');

    this.ngxLoaderService.startLoader(loaderId);
  }

  hideLoader(loaderId: string = 'default'): void {
    this.ngxLoaderService.stopLoader(loaderId);
  }
}
