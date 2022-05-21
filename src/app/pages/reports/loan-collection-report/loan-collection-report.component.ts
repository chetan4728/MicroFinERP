import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { LocalStorageService } from 'angular-web-storage';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../src/environments/environment.prod';
import * as XLSX from 'xlsx';  
declare var $: any;


@Component({
  selector: 'app-loan-collection-report',
  templateUrl: './loan-collection-report.component.html',
  styleUrls: ['./loan-collection-report.component.scss']
})
export class LoanCollectionReportComponent implements OnInit {

  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  ListingData:any;
  sessiondata:any;
  jsonData:any;
  reportsData: any[]= [];
  data2Export: any[]=[];
  selectedFromDate: any;
  selectedToDate: any;
  date2Check: any;

  constructor(private api:ReportsService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.sessiondata = this.session.get(environment.userSession);
  }

  get_loan_collection_report(){
    this.api.get_loan_collection_report({bank_id:this.sessiondata.bank_id}).subscribe(data=>{
      this.ListingData = data;
      // console.log("ListingData", this.ListingData, "length", this.ListingData.length);
      this.ListingData.forEach(el => {
        if(el.get_loan_details && el.get_loan_details.paid_date){
          // && el.get_loan_details.paid_date
          this.date2Check = el.get_loan_details.paid_date;
          var dateContains = this.isDateContained(el.get_loan_details.paid_date);
          // console.log("dateContains", dateContains);
          
          if(dateContains){
            // console.log("el", el);
            let data2Send = {
              "Center_Name": el.center_name,
              "Group_Name": el.group_name,
              "Customer_Name": el.applicant_name,
              "Account_No":  el.account_no,
              "Loan Account Number": el.loan_account_number,	
              "External Account Number": el.external_account_no,           
              "Installment_Amount": el.get_loan_details ? el.get_loan_details.monthly_emi : "",
              "Saving_Amount": "",
              "Balance_Amount": el.get_loan_details ? el.get_loan_details.outstanding : "", 
              // "Advance_Amount": el.advanceamount,
              "Paid_Amount": el.get_loan_details ? el.get_loan_details.total_paid : "",
              "Interest_Paid": el.get_loan_details ? el.get_loan_details.interest_paid: "",
              // "Payment_ID": "",//need to create in DB
              "Payment_Status": "Success",
              "Payment_Datetime":  el.get_loan_details ? el.get_loan_details.paid_date : "",
              // "Collector_Mobile": el.csr_contact,
              "Collector_Name": el.csr_name,
              "User_Id": el.csr_id,
              "Unit_Name": el.branch_name,
              "Client_Name": this.sessiondata.bank_name,
            }      
            this.data2Export.push(data2Send);   
          }
          
        }       
        // console.log("data2Export", this.data2Export);
        this.ListingData = this.data2Export;
        // console.log("ListingData", this.ListingData, "length", this.ListingData.length);
      });     
      
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

  selectFromDate(date){ 
    this.selectedFromDate = this.formatDate(date);
  }

  selectToDate(date){ 
    this.selectedToDate = this.formatDate(date);
    this.get_loan_collection_report();
  }

  formatDate(date){
    let d = date;
    let formatedDate = new Date(d).getFullYear().toString().padStart(2, '0')+'-'+(new Date(d).getMonth()+1).toString().padStart(2, '0')+'-'+new Date(d).getDate().toString().padStart(2, '0');
    return formatedDate;
  }

  isDateContained(date){
    this.date2Check = this.formatDate(date);    
    if(this.date2Check <= this.selectedToDate && this.date2Check >= this.selectedFromDate){
      return true;
    }   
  }

  getLoanCollectionReport(){
    this.exportLoanCollectionReport();
  }

  exportLoanCollectionReport(){
    this.jsonData = this.ListingData;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData, {header: []});  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, "LoanCollectionReport"+'.xlsx',{ bookType: 'xlsx', type: 'buffer' });   
  }

}
