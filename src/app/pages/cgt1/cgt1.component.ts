import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { LocalStorageService } from 'angular-web-storage';
import { Subject } from 'rxjs';
import { environment } from '../../../../src/environments/environment.prod';
import * as XLSX from 'xlsx';  
import { CGTService } from '../../services/cgt.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-cgt1',
  templateUrl: './cgt1.component.html',
  styleUrls: ['./cgt1.component.scss']
})
export class Cgt1Component implements OnInit {
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
  cgtData: any[]= [];
  groupList: any;
  cgt1Data: any[]= [];
  cgtListingData: any;
  constructor(private router:Router,private formBuilder: FormBuilder,private api:CGTService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.sessiondata = this.session.get(environment.userSession);
    this._getCGTList();
    this.getGroupList();
    // this.get_loan_distribution_details();
    this.initForm();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }

  viewForm(data): void
  {

    
    this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);
    document.getElementById('close-modal').click();
  }

  showModal(): void {
  
  

  }

  exportHighMarkData()
  {
   //console.log("test"+JSON.stringify(this.record))
   this.api.get_high_mark_list_cgt1({area_id:this.record.area_id,branch_id:this.record.branch_id,bank_id:this.record.bank_id,center_id:this.record.center_id,group_id:this.record.group_id}).subscribe(data =>{
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
      if(this.sessiondata.role_code == 'BM'){
        this.ListingData.find((v) => { 
          if(v.branch_id == this.sessiondata.employee_branch_id){
            this.cgtData.push(v);
          }
        });
        this.ListingData = this.cgtData;
      }
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

  getGroupList(){
    this.api.get_group_list({bank_id:this.sessiondata.bank_id}).subscribe(data=>{
      this.ListingData = data;
      if(this.sessiondata.role_code == 'BM'){
        this.ListingData.find((v) => { 
          // console.log("v.branch_id == this.sessiondata.employee_branch_id", v.branch_id , this.sessiondata.employee_branch_id);
          if(v.branch_id == this.sessiondata.employee_branch_id){            
            this.cgtData.push(v);
          }
        });
        this.ListingData = this.cgtData;
        // console.log("ListingData", this.ListingData);
        // this.get_loan_distribution_details(this.ListingData);
                
      }
      this.ListingData = this.ListingData.reverse();
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

  get_loan_distribution_details(listData:any){
    this.api.get_loan_distribution_details({bank_id:this.sessiondata.bank_id}).subscribe(data=>{
      this.cgtListingData = data;
      this.cgtListingData.find((l) => { 
          listData.find(g => {
            // g.is_approved = (g.group_id != l.group_id) ? false : true;
            // console.log("g.group_id != l.group_id", g.group_id != l.group_id, "GRoupID",  g.group_id , "loanID",  l.group_id);
            
            if( g.group_id != l.group_id){
              g.is_approved = false;
              this.cgt1Data.push(g);
            } else{
              g.is_approved = true;
            }           
          });
        });                
        // console.log("cgtListingData", listData);
        // this.ListingData = listData;
        // this.ListingData.forEach(el => {
        //  console.log(" el.is_approved",  el.is_approved);
         
          // if(el.is_approved == false){
          //   this.cgt1Data.push(el);
                 
          // }
          this.ListingData = this.cgt1Data;
            // console.log("this.ListingData", this.ListingData);
       
        // });
    });
  }

  getApplication_from()
  {
    let targetURL  = environment.portal+"cgt_application_download/"+this.record.bank_id+"/"+this.record.area_id+"/"+this.record.branch_id+"/"+this.record.center_id+"/"+this.record.group_id
    window.open(
      targetURL,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  view_cgt(row)
  {
  
 this.record =  row;
 let approvedMembers = [];
 row.approved_members.forEach(member => {
  // console.log("member", member);
  if(member.is_cgt_verfied == 0){
    approvedMembers.push(member);
  }
   
 });
  this.approved_members = approvedMembers; // row.approved_members;

  $('#myModal').modal('show');
  }

  submit()
  {

  }

}
