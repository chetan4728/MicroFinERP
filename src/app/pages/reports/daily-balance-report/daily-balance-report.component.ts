import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportsService } from '../../../services/reports.service';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../../../src/environments/environment.prod';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';  
declare var $: any;

@Component({
  selector: 'app-daily-balance-report',
  templateUrl: './daily-balance-report.component.html',
  styleUrls: ['./daily-balance-report.component.scss']
})
export class DailyBalanceReportComponent implements OnInit {

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
  reportsData: any[]= [];
  data2Export: any[]=[];
  currentDateTime: any; 
  diff_days: any;  
  addOnInterest: any;
  loan_amount: any;
  loading:any;
  constructor(private api:ReportsService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.sessiondata = this.session.get(environment.userSession);
    //console.log(this.sessiondata)
   
  }

  get_daily_balance_report(){
    this.loading = true;
    this.getCurrentDateTime();    
    this.api.get_daily_balance_report({bank_id:this.sessiondata.bank_id,branch_id:this.sessiondata.employee_branch_id}).subscribe(data=>{
      this.ListingData = data;

     
      // console.log("ListingData", this.ListingData);      
      this.ListingData.forEach(el => {
        // console.log("el");
        if( el.get_loan_details &&  el.get_loan_details.due_date){
          this.checkDueDate(this.currentDateTime.currentDate, el.get_loan_details.due_date);
        }
        let data2Send = {
          "report_date": this.currentDateTime.currentTime,
          "branch_code": el.branch_id,
          "branch_name": el.branch_name,
          "product_code": "Samrudhi",
          "centre_name": el.center_id,
          "group_name": el.group_id,
          "loan_account_number": el.loan_account_number,																			
          "customer_id": el.loan_application_number,
          "customer_name": el.applicant_name,
          "member_birth_date": el.dob,
          "member_age": el.age,
          "nominee_name": el.nominee_name,
          "nominee_age": el.nominee_age,
          "nominee_relation": el.nominee_relation,
          "voter_id_no": el.voter_id_no,
          "uid_no": el.uid_no,
          "pan_card_no": el.pan_card_no,
          "ration_card_no": el.ration_card_no,
          "pincode": el.pincode,
          "loan_purpose": el.loan_purpose,
          "cust_cell": el.cust_cell,
          "account_no": el.account_no,
          "external_account_no": el.external_account_no,  //account_no,
          "collector": el.collector,
          "originator_name": el.originator_name,
          "disbursal_date": el.get_loan_details ? el.get_loan_details.disbursal_date : '',
          "disburse_create_date":  el.get_loan_details ? el.get_loan_details.disburse_create_date : '',
          "loan_start_date": el.get_loan_details ? el.get_loan_details.loan_start_date : '',	
          "maturity_date": el.get_loan_details ? this.getMaturityDate(el.get_loan_details.loan_start_date): '', //last emidate
          "loan_amount": el.get_loan_details ? el.get_loan_details.total_loan : '', // outstanding
          "emi_amount": el.get_loan_details ? el.get_loan_details.monthly_emi : '',
          "last_emi_amount": el.get_loan_details?  el.get_loan_details.last_emi : '',
          // "first_emi_amount": el.get_loan_details ? el.get_loan_details.monthly_emi : '', //el.get_loan_details.loan_emi_data.sheduled payment:
          "oustanding_principal": el.get_loan_details ? el.get_loan_details.outstanding : '', // el.get_loan_details.endingbalance, //el.get_loan_details.loan_emi_data.ending_balance: '',
          "outstanding_interest": el.get_loan_details ? el.get_loan_details.outstanding_interest : 0,
          "overdue_principal": el.get_loan_details ? el.get_loan_details.total_overdue_principal : 0,
          "overdue_interest": el.get_loan_details && this.addOnInterest ? (el.get_loan_details.total_overdue_interest + this.addOnInterest) : 0,
          // "overdue_fee": 0,
          "dpd_days": this.diff_days ?this.diff_days : 0, //el.get_loan_details ? el.get_loan_details.diffDays : '',
          // "bc_branch": "",
          // "advanceamount": el.advanceamount,
          "loan_cycle_no": el.loan_cycle_no,
          "tenor":el.tenor,
          // "account_status": "",
          "village_code": el.village_code,	
        }
        this.loan_amount = data2Send.oustanding_principal
        
        if(data2Send.disbursal_date != undefined){
          this.data2Export.push(data2Send);
        }
        // console.log("data2Export", this.data2Export);
        this.ListingData = this.data2Export;
      });     
    
      this.jsonData = this.ListingData;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData, {header: []});  
      //  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet( this.ListingData, {header: ['Report Date','Branch Name','Product Code','Center Name','Group Name',
      //  'Customer ID','Customer Name','Mobile No','Account No','External Account No','Collector','Original Date','Disburse Date','Disburse Create Date',
      // 'Loan Start Date','Maturity Date','Loan Amount','EMI Amount','First EMI Amount','Outstanding Principal','Outstanding Interest','Overdue Principal',
      // 'Overdue Interest','Overdue Fee','DPD Days','BC Branch','Advance Amount','Loan Cycle No','Tenor','Account Status','Village Code']});
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      this.loading = false;
      XLSX.writeFile(wb, "Daily Balance Report_"+this.currentDateTime.currentDate+'.xlsx',{ bookType: 'xlsx', type: 'buffer' });   
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
    this.loading = false;
  }

  getCurrentDateTime(){
    let todayDate = new Date();
    let currentDate = todayDate.getFullYear().toString().padStart(2, '0')+'-'+(todayDate.getMonth()+1).toString().padStart(2, '0')+'-'+todayDate.getDate().toString().padStart(2, '0');
    let currentTime = todayDate.getHours().toString().padStart(2, '0') + ":" + todayDate.getMinutes().toString().padStart(2, '0') + ":" + todayDate.getSeconds().toString().padStart(2, '0');
    this.currentDateTime = {
      'currentDate': currentDate,
      'currentTime': currentTime
    }
    // console.log("currentDateTime", this.currentDateTime);
    return this.currentDateTime;
  }

  checkDueDate(curr_date, due_date){   
    // console.log("curr_date",this.formatDate(curr_date), "due_date",this.formatDate(due_date));
    if(new Date(this.formatDate(due_date)) < new Date(this.formatDate(curr_date))){
      this.getDpdDays(curr_date, due_date);
    }
  }

  getDpdDays(curr_date, due_date){
    // console.log("curr_date",this.formatDate(curr_date), "due_date",this.formatDate(due_date));
    const daily_interest = this.loan_amount/100* 0.0712329;
    const date1 = new Date(this.formatDate(curr_date)); // new Date('2010/7/13');
    const date2 = new Date(this.formatDate(due_date)); //new Date('2010/7/13');
    var diffTime = date2.getTime() - date1.getTime(); 
    this.diff_days = diffTime / (1000 * 60 * 60 * 24);
    this.addOnInterest = daily_interest * this.diff_days;
    // console.log(this.addOnInterest + " addOnInterest");
    return this.diff_days;
  }

  formatDate(date){
    let d = date;
    let formatedDate = (new Date(d).getMonth()+1).toString().padStart(2, '0')+'-'+new Date(d).getDate().toString().padStart(2, '0')+'-'+new Date(d).getFullYear().toString().padStart(2, '0');
    return formatedDate;
  }

  getMaturityDate(date){    
    let d = new Date(date).setMonth(new Date(date).getMonth() + 24);
    let maturityDate = new Date(d).getFullYear().toString().padStart(2, '0')+'-'+(new Date(d).getMonth()+1).toString().padStart(2, '0')+'-'+new Date(d).getDate().toString().padStart(2, '0');
    // console.log("maturityDate", maturityDate);
    return maturityDate;
  }

  exportDailyBalanceReport(){
    this.get_daily_balance_report();
  
  }



}