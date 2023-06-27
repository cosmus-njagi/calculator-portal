import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { CurrencyFormatPipe } from './custom-pipe/currency-format.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { PdfDownloadService } from 'src/services/PdfDownloadService.service';
import { AlertService } from 'src/services/alert-service.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: 'circle',
  fgsColor: '#000000',
  fgsSize: 60,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CurrencyFormatPipe,
  ],
  providers: [AuthGuard, PdfDownloadService, CurrencyFormatPipe, AlertService],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
