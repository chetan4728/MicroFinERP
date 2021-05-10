import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-managebanks',
  templateUrl: './managebanks.component.html',
  styleUrls: ['./managebanks.component.scss']
})
export class ManagebanksComponent implements OnInit {
  bankList:any;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  constructor(private api:BankService) { }

  ngOnInit(): void {
    this.LoadDatatable();
  }

  LoadDatatable(): void{

    this.api._getallbanks().subscribe((data) => {

      this.bankList = data;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
  });
  }

}
