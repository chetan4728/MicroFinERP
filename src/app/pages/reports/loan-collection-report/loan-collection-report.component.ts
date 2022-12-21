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
  public loading: boolean;
  public clicked: boolean = true;
  constructor(private api:ReportsService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.sessiondata = this.session.get(environment.userSession);
  }

  get_loan_collection_report(){

    this.loading = true;
    this.clicked = false;
    this.api.get_loan_collection_report({bank_id:this.sessiondata.bank_id, select_from: this.selectedFromDate,select_to: this.selectedToDate}).subscribe(data=>{
      this.ListingData = data;
      console.log(data)
      // console.log("ListingData", this.ListingData, "length", this.ListingData.length);
      this.ListingData.forEach(el => {
        if(el.get_loan_details){
          console.log(el.get_loan_details)
          // && el.get_loan_details.paid_date
         // this.date2Check = el.get_loan_details.paid_date;
          //var dateContains = this.isDateContained(el.get_loan_details.paid_date);
          // console.log("dateContains", dateContains);
          
    
            // console.log("el", el);
            let data2Send = {
              //"created_date": el.created_date,
              "Center_Name": el.center_name,
              "Group_Name": el.group_name,
              "Customer_Name": el.applicant_name,
              "Customer_Mobile": el.applicant_mob_no,
              "Saving Account_No":  el.account_no,
              "Loan Account Number": el.loan_account_number,	
              "External Account Number": el.external_account_no,           
              "Installment_Amount": el.get_loan_details ? el.get_loan_details.monthly_emi : "",
              "Balance_Amount": el.get_loan_details ? el.get_loan_details.outstanding : "", 
              "Paid_Amount": el.get_loan_details ? el.get_loan_details.total_paid : "",
              "Interest_Paid": el.get_loan_details ? el.get_loan_details.interest_paid: "",
              "Payment_Status": "Success",
              "Payment_Datetime":  el.get_loan_details ? el.get_loan_details.paid_date : "",
              "Collector_Name": el.csr_name,
              "User_Id": el.csr_id,
              "Unit_Name": el.branch_name,
              "Client_Name": this.sessiondata.bank_name,
            }      
           this.data2Export.push(data2Send);   
          }
          
      
         console.log("data2Export", this.data2Export);
   
      
        // console.log("ListingData", this.ListingData, "length", this.ListingData.length);
      });     
   
      this.jsonData = this.ListingData;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data2Export, {header: []});  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  

      XLSX.writeFile(wb, "Loan-collection-report-"+new Date()+'.xlsx',{ bookType: 'xlsx', type: 'buffer' });  
      this.loading = false;
      this.clicked = true;
    
    })
  }

  selectFromDate(date){ 
    this.selectedFromDate = this.formatDate(date);
  }

  selectToDate(date){ 
    this.selectedToDate = this.formatDate(date);
    
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
    this.get_loan_collection_report();
   
    
  }

}
