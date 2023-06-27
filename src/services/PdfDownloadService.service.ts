import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, TableCell } from 'pdfmake/interfaces';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfDownloadService {
  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  downloadPDF(
    description: any,
    data: any[],
    headers: string[],
    filename: string
  ) {
    const documentDefinition: TDocumentDefinitions = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Loan_Calculator', style: 'header' },
        {
          ul: description.map((item: any) => [
            { text: `${item.label}: ${item.value}` },
            '\n', // Add a blank line after each item
          ]),
        },
        {
          table: {
            headerRows: 1,
            widths: Array(headers.length).fill('auto'),
            body: [
              headers,
              ...data.map((item) => Object.values(item) as TableCell[]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableStyle: {
          font: 'Roboto-Bold.ttf',
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download(filename);
  }

  sendDocToEmail(
    description: any,
    data: any[],
    headers: string[],
    filename: string
  ): Observable<File> {
    const fileSubject = new Subject<File>();

    const documentDefinition: TDocumentDefinitions = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Loan_Calculator', style: 'header' },
        {
          ul: description.map((item: any) => [
            { text: `${item.label}: ${item.value}` },
            '\n', // Add a blank line after each item
          ]),
        },
        {
          table: {
            headerRows: 1,
            widths: Array(headers.length).fill('auto'),
            body: [
              headers,
              ...data.map((item) => Object.values(item) as TableCell[]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableStyle: {
          font: 'Roboto-Bold.ttf',
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBuffer((buffer: ArrayBuffer) => {
      const file = new File([buffer], filename, { type: 'application/pdf' });
      fileSubject.next(file);
      fileSubject.complete();
    });

    return fileSubject.asObservable();
  }
}
