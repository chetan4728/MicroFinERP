import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-applicationpdf',
  templateUrl: './applicationpdf.component.html',
  styleUrls: ['./applicationpdf.component.scss']
})
export class ApplicationpdfComponent implements OnInit {

  constructor() {const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  pdfMake.createPdf(documentDefinition).open(); }

  ngOnInit(): void {
    
  }

}
