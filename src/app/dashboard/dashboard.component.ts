import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api-service.service';
import { LoaderService } from 'src/services/loader-service.service';
import { environment } from '../../environments/environment';
import { AuthService } from 'src/services/auth-service.service';
import { PdfDownloadService } from 'src/services/PdfDownloadService.service';
import { CurrencyFormatPipe } from '../custom-pipe/currency-format.pipe';
import { AlertService } from 'src/services/alert-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  calculatorForm: FormGroup;
  displayedColumns: string[] = [
    'installmentNumber',
    'startingBalance',
    'installmentAmount',
    'interestAmount',
    'dueDate',
    'totalRepayment',
  ];
  installments: any[] = [];
  showTable: boolean = false;
  exciseDuty: number = 0;
  interestRate: number = 0;
  legalFees: number = 0;
  takeHomeAmount: number = 0;
  processingFees: number = 0;
  greet: string = '';
  data: any;
  currentPage: number = 1;
  totalPages!: number;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private apiService: ApiService,
    private authService: AuthService,
    private pdfDownloadService: PdfDownloadService,
    private currencyFormatPipe: CurrencyFormatPipe,
    private alertService: AlertService
  ) {
    this.calculatorForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(50000)]],
      paymentFrequency: ['', Validators.required],
      loanPeriod: ['', [Validators.required, Validators.max(48)]],
      startDate: ['', Validators.required],
      interestType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.greetings();
    this.fetchData();
  }

  logOutFunction() {
    this.authService.logout();
  }

  submitForm() {
    this.loaderService.showLoader();
    // Handle form submission
    console.log('form values ###', this.calculatorForm.value);
    const endpoint = environment.url.calculator;
    const data = this.calculatorForm.value;
    this.apiService.postWithHeaders(endpoint, data).subscribe({
      next: (response: any) => {
        // Handle the successful response
        this.showTable = true;
        this.installments = response['installments'];
        this.exciseDuty = response['exciseDuty'];
        this.interestRate = response['interestRate'] * 100;
        this.legalFees = response['legalFees'];
        this.processingFees = response['processingFees'];
        this.takeHomeAmount = parseFloat(response['takeHomeAmount']);
        this.fetchData(); // Fetch data after assigning the installments property
      },
      error: (error) => {
        // Handle the error
        console.error(error);
      },
    });
  }

  //export data to pdf
  exportTableAsPdf() {
    let tableHeaders = [
      'No.',
      'Due Date',
      'Starting Balance',
      'Installment Amount',
      'Interest Amount',
      'Total Repayment',
    ];
    let description = [
      {
        label: 'Excise duty',
        value: this.currencyFormatPipe.transform(this.exciseDuty),
      },
      { label: 'Interest Rate', value: this.interestRate },
      {
        label: 'Legal Fees',
        value: this.currencyFormatPipe.transform(this.legalFees),
      },
      {
        label: 'Processing Fees',
        value: this.currencyFormatPipe.transform(this.processingFees),
      },
      {
        label: 'Take Home Amount',
        value: this.currencyFormatPipe.transform(this.takeHomeAmount),
      },
    ];

    this.pdfDownloadService.downloadPDF(
      description,
      this.installments,
      tableHeaders,
      'loan_calculator.pdf'
    );
  }

  fetchData() {
    const startIndex = (this.currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    this.data = this.installments.slice(startIndex, endIndex);

    // Calculate the total number of pages based on the total data count
    this.totalPages = Math.ceil(this.installments.length / 10);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchData();
    }
  }

  //send pdf to email
  sendEmail() {
    this.alertService.sendEmail();
  }

  // greetings
  greetings() {
    let myDate = new Date();
    let hrs = myDate.getHours();
    if (hrs < 12) {
      this.greet = 'Good Morning';
    } else if (hrs >= 12 && hrs <= 16) {
      this.greet = 'Good Afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      this.greet = 'Good Evening';
    }
  }
}
