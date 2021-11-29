import { Branch } from './../../model/branch';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { LocalStorageService } from 'angular-web-storage';
import { Subject } from 'rxjs';
import { CGTService } from 'src/app/services/cgt.service';
import { environment } from 'src/environments/environment.prod';
import * as XLSX from 'xlsx';  
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
  approved_members:any;
  excel_title:any;
  record:any;
  jsonData:any;
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

  exportHighMarkData()
  {
   //console.log("test"+JSON.stringify(this.record))
   this.api.get_high_mark_list({area_id:this.record.area_id,branch_id:this.record.branch_id,bank_id:this.record.bank_id,center_id:this.record.center_id,group_id:this.record.group_id}).subscribe(data =>{
     this.jsonData = data;

     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData, {header: []});  
       const wb: XLSX.WorkBook = XLSX.utils.book_new();  
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
       XLSX.writeFile(wb, "HIGHMARK-"+this.record.center_id+"-"+this.record.group_id+ '.xlsx',{ bookType: 'xlsx', type: 'buffer' }); 
   })
   
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
  getApplication_from()
  {
    let targetURL  = "http://sfsfin.in/portal/application_download/"+this.record.bank_id+"/"+this.record.area_id+"/"+this.record.branch_id+"/"+this.record.center_id+"/"+this.record.group_id
    window.open(
      targetURL,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  view_cgt(row)
  {
  
 this.record =  row;
  this.approved_members = row.approved_members;

  $('#myModal').modal('show');
  }

  submit()
  {

  }

}
