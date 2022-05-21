import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../../src/environments/environment.prod';
import { Subject } from 'rxjs';
import { ReportsService } from '../../services/reports.service';
import { LoanDisbursementService } from '../../services/loan.disbursement.service';
import { EmployeeService } from '../../services/employee.service';
declare var $: any;
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtTrigger: Subject<String> =  new Subject();
  ListingData:any;
  SessionData: any;
  Url:any;
  selectedEmpId: any;
  employeeData:any[] = [];
  employeeList: any;
  selectedDate: any;
  GroupByData: any;
    disbursementData: any;
  
  constructor(private loandisburseapi: LoanDisbursementService,private api:ReportsService,private employeeapi: EmployeeService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.session.get(environment.userSession);
    // this.getListing();
    this.get_employee_list();
    // this.get_collection_balance_sheet();
    this.Url = environment.uploads;
  }

  get_employee_list(){
    this.employeeapi.get_employee_list().subscribe(data=>{
    this.employeeList = data;
    // console.log("employeeList", this.employeeList); 
    //  if(this.SessionData.role_code == 'BM'){
          this.employeeList.find((v) => {             
            if(v.bank_id == this.SessionData.bank_id){
              this.employeeData.push(v);
            }
          });
          this.employeeList = this.employeeData;          
        // }
    });
  }

  getListing(){
      this.loandisburseapi._get_loan_distribution_applications({bank_id:this.SessionData.bank_id}).subscribe(data  => {
        this.ListingData = data;
        if(this.SessionData.role_code == 'BM'){
          this.ListingData.find((v) => { 
            if(v.branch_id == this.SessionData.employee_branch_id){
              this.disbursementData.push(v);
            }
          });
          this.ListingData = this.disbursementData;
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
    });
  }

  get_collection_sheet(){
    // , created_by: this.selectedEmpId, created_on: this.selectedDate
    this.api.get_collection_sheet({bank_id:this.SessionData.bank_id,created_by: this.selectedEmpId, created_on: this.selectedDate}).subscribe(data=>{
      this.ListingData = data;
      // console.log("Listing Data", this.ListingData);        
      
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

  get_collection_balance_sheet(){
    // this.get_collection_data_group_by();
    this.api.get_collection_balance_sheet({bank_id:this.SessionData.bank_id,created_by: this.selectedEmpId, created_on: this.selectedDate}).subscribe(data=>{
      this.GroupByData = data;
      // console.log("GroupByData", this.GroupByData);
      // this.get_collection_data_group_by();
    });
  }

  CollectionDemandPDF(){
    this.get_collection_balance_sheet();
    // console.log("this.selectedEmpId", this.selectedEmpId, "this.selectedDate", this.selectedDate );
    let targetURL  = "http://sfsfin.in/portal/api/Document/CollectionSheetPDF/"+this.SessionData.bank_id+'/'+this.selectedEmpId+'/'+this.selectedDate
    window.open(
      targetURL,
      '_blank' // <- This is what makes it open in a new window.
    );
    // this.get_collection_sheet();
  }

  get_collection_data_group_by(){
    this.api.get_collection_data_group_by({bank_id:this.SessionData.bank_id,created_by: this.selectedEmpId, created_on: this.selectedDate}).subscribe(data=>{
      this.GroupByData = data;
      // console.log("GroupByData1", this.GroupByData);
    });
    }
  
  
}