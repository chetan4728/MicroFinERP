import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { LocalStorageService } from 'angular-web-storage';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import * as XLSX from 'xlsx';  
declare var $: any;

@Component({
  selector: 'app-month-demand-report',
  templateUrl: './month-demand-report.component.html',
  styleUrls: ['./month-demand-report.component.scss']
})
export class MonthDemandReportComponent implements OnInit {
  
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  ListingData:any;
  sessiondata:any;
  jsonData:any;
  reportsData: any[]= [];
  data2Export: any[]=[];
  selectedFrom: any;
  selectedTo: any;
  date2Check: any;
  public loading: boolean;
  public clicked: boolean = true;
  constructor(private api:ReportsService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.sessiondata = this.session.get(environment.userSession);
  }

  get_month_demand_report(){
    this.loading = true;
    this.clicked = false;
    this.api.get_month_demand_report({bank_id:this.sessiondata.bank_id, select_from: this.selectedFrom,select_to: this.selectedTo}).subscribe(data=>{
      this.ListingData = data;      
      this.ListingData.forEach(el => {
        if(el.get_loan_details.length != 0){   
          // console.log("el.get_loan_details.due_date",el.get_loan_details.due_date);
          var dateContains = this.isDateContained(el.get_loan_details.due_date);
           console.log("dateContains", dateContains);          
         
            let data2Send = {
              "State": el.state,
              "Client": this.sessiondata.bank_name,
              "District": el.district,
              "Branch Code": el.branch_id,
              "Branch Name": el.branch_name,
              "Manager Name": this.sessiondata.employee_first_name + this.sessiondata.employee_last_name,																			
              "Remarks": "",
              "CSR ID": el.csr_id,
              "CSR Name-New": el.csr_name,
              // "Loan_Amt": el.loan_amount,
              "Center Name": el.center_name,
              "Group Name": el.group_name,
              "Customer Name": el.applicant_name,
              "Customer ID": el.loan_application_number,
              "Saving Account Number":  el.account_no,
              "Loan_Account_Number": el.loan_account_number,
              "Product": el.get_loan_details?  el.get_loan_details.intrest_product : "",
              "Originator": el.originator_name,
              "Collector_Name": el.collector,
              "Loan_Amount": el.get_loan_details?  el.get_loan_details.total_loan : '',
              "Principal_Paid_Amount": el.get_loan_details? (el.get_loan_details.total_loan && el.get_loan_details.outstanding) ?(el.get_loan_details.total_loan - el.get_loan_details.outstanding): "": "" ,
              "Total_Interest_Paid": el.get_loan_details ? el.get_loan_details.interest_paid : '', //outstanding_interest : '',
              "Due Date": el.get_loan_details ? el.get_loan_details.due_date: "",
              "Installment_No": el.get_loan_details ? el.get_loan_details.emi_no: '',
              "OutStanding_Principal": el.get_loan_details ? el.get_loan_details.outstanding : 0, 
              "Overdue_Principal": el.get_loan_details ? el.get_loan_details.total_overdue_principal : 0,
              "Overdue_Interest": el.get_loan_details ? el.get_loan_details.total_overdue_interest : 0,
              "Compulsory_Saving_Amount": 300,
              "Total_Due_Amount":el.get_loan_details ? this.roundToNearest(el.get_loan_details.total_overdue_principal + el.get_loan_details.total_overdue_interest,10) : 0,
              "First_Emi_Date": el.get_loan_details ? el.get_loan_details.first_emi_date: "",
              "First_Emi_Amount": el.get_loan_details ? el.get_loan_details.monthly_emi: "",
              "Last_Emi_Date": el.get_loan_details?  el.get_loan_details.last_emi_date : '',
              "Last_Emi_Amount": el.get_loan_details?  el.get_loan_details.last_emi : "",
              // "Advance_Amount": el.advanceamount,
            }
            this.data2Export.push(data2Send);
          
        }
      
      });    
          if(this.data2Export)
          {
            console.log("------"+this.data2Export)
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data2Export, {header: []});  
            const wb: XLSX.WorkBook = XLSX.utils.book_new();  
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
            XLSX.writeFile(wb, "Months Demand-"+ this.selectedFrom +"-"+this.selectedTo+'.xlsx',{ bookType: 'xlsx', type: 'buffer' });  
            this.loading = false;
            this.clicked = true;
          }
    
    })
  }

  selectFromDate(date){ 
    this.selectedFrom = this.formatDate(date);
  }

  selectToDate(date){ 
    this.selectedTo = this.formatDate(date);
    
  }

  formatDate(date){
    let d = date;
    let formatedDate = new Date(d).getFullYear().toString().padStart(2, '0')+'-'+(new Date(d).getMonth()+1).toString().padStart(2, '0')+'-'+new Date(d).getDate().toString().padStart(2, '0');
    return formatedDate;
  }

  roundToNearest(numToRound, numToRoundTo) {
    return Math.round(numToRound / numToRoundTo) * numToRoundTo;
  }

  isDateContained(date){
    this.date2Check = this.formatDate(date); 
    if(this.date2Check <= this.selectedTo && this.date2Check >= this.selectedFrom){       
      return true;
    } else {
      return false;
    }
  }

  getMonthDemandReport(){
    this.get_month_demand_report();
  }

  exportMonthDemandReport(){
  // console.log("data2Export", this.ListingData);
    if(this.ListingData){
      
    }
  }

}
