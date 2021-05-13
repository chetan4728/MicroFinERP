import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BankService } from 'src/app/services/bank.service';
import Swal from 'sweetalert2';
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
  constructor(private router: Router, private api:BankService) { }

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

  edit(row):void{
    this.router.navigate(['/Activebanks/BankEdit/' + row.bank_id]);
  }

  delete_row(row):void{
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.api._delete_bank(row).subscribe(data =>
          {
             this.LoadDatatable();
             Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        );
      }
    });
  }

}
