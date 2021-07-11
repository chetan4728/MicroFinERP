import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { LocalStorageService } from 'angular-web-storage';
import { Subject } from 'rxjs';
import { CGTService } from 'src/app/services/cgt.service';
import { environment } from 'src/environments/environment.prod';
declare var $: any;
@Component({
  selector: 'app-cgt',
  templateUrl: './cgt.component.html',
  styleUrls: ['./cgt.component.scss']
})
export class CgtComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  ListingData:any;
  Form: FormGroup;
  sessiondata:any;
  public rowdata:any;
  constructor(private formBuilder: FormBuilder,private api:CGTService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.sessiondata = this.session.get(environment.userSession);
    this. _getCGTList();
    this.initForm();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }

  showModal(): void {
  
  

  }

  initForm(): void {
    this.Form = this.formBuilder.group({
     area_name: ['', Validators.required],
    });
  }
  _getCGTList()
  {
    this.api._get_cgt({bank_id:this.sessiondata.bank_id}).subscribe(data=>{

      this.ListingData = data;
      
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
    })
  }

  view_cgt(row)
  {
  this.rowdata  = row;
  $('#myModal').modal('show');
  }

  submit()
  {

  }

}
