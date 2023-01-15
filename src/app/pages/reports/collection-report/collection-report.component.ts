import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { LocalStorageService } from 'angular-web-storage';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from '../../../../../src/environments/environment.prod';
import * as XLSX from 'xlsx';  
declare var $: any;

@Component({
  selector: 'app-collection-report',
  templateUrl: './collection-report.component.html',
  styleUrls: ['./collection-report.component.scss']
})
export class CollectionReportComponent implements OnInit {

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
  currentDateTime: any; 
  public loading: boolean;
  constructor(private api:ReportsService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.sessiondata = this.session.get(environment.userSession);
    // this.get_collection_report();
  }

  get_collection_report(){
    this.loading = true;
    this.api.get_collection_report({role:this.sessiondata.role_code,branch_id:this.sessiondata.employee_branch_id,bank_id:this.sessiondata.bank_id}).subscribe(data=>{
      this.ListingData = data;
      // console.log("ListingData", this.ListingData);
      this.getCurrentDateTime();
      this.ListingData.forEach(el => {
        if(el.get_loan_details && el.get_loan_details.paid_date){
          this.date2Check = el.get_loan_details.paid_date;
          var dateContains = this.isDateContained(el.get_loan_details.paid_date);
          // console.log("dateContains", dateContains);
         
            let data2Send = {
              "Date of Collection": el.get_loan_details && el.get_loan_details.paid_date  ? el.get_loan_details.paid_date : "",
              "Branch Code": el.branch_id,
              "Branch Name": el.branch_name,
              "Center Name": el.center_name,
              "Group Name": el.group_name,
              "Collector": el.collector,
              "Customer ID": el.loan_application_number,
              "Customer Name": el.applicant_name,
              "Loan_Number": el.loan_application_number,
              "Principal_Recovery": el.get_loan_details && el.get_loan_details.currrent_paid  ? this.roundToNearest(el.get_loan_details.currrent_paid, 10) : 0,
              "Interest_Recovery": el.get_loan_details && el.get_loan_details.current_interest ? this.roundToNearest(el.get_loan_details.current_interest,10) : 0,
              // "Principal_Recovery": el.get_loan_details && el.get_loan_details.total_paid  ? el.get_loan_details.total_paid : 0,
              // "Interest_Recovery": el.get_loan_details && el.get_loan_details.interest_paid ? el.get_loan_details.interest_paid : 0,
              "Total Paid Amount": el.get_loan_details && el.get_loan_details.currrent_paid && el.get_loan_details.interest_paid ? this.roundToNearest((Number(el.get_loan_details.currrent_paid) + Number(el.get_loan_details.current_interest)),10) : 0, // (el.get_loan_details.total_paid + el.get_loan_details.interest_paid) 
              "RD": '',
              "Remark": "Success",
              // "Collection_Time": this.currentDateTime.currentTime,
              // "Schedule_Time": "",
              "Saving_Amount": 300
            }
            this.data2Export.push(data2Send);
          }

          
        
      });     
      
      this.jsonData = this.data2Export;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData, {header: []});  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, "Collection Report"+new Date()+'.xlsx',{ bookType: 'xlsx', type: 'buffer' });   
      this.loading = false;
    })
  }

  roundToNearest(numToRound, numToRoundTo) {
    return Math.round(numToRound / numToRoundTo) * numToRoundTo;
  }

  selectFromDate(date){ 
    this.selectedFromDate = this.formatDate(date);
  }

  selectToDate(date){ 
    this.selectedToDate = this.formatDate(date);

  }

  isDateContained(date){
    this.date2Check = this.formatDate(date);    
    if(this.date2Check <= this.selectedToDate && this.date2Check >= this.selectedFromDate){
      return true;
    }   
  }

  formatDate(date){
    let d = date;
    let formatedDate = new Date(d).getFullYear().toString().padStart(2, '0')+'-'+(new Date(d).getMonth()+1).toString().padStart(2, '0')+'-'+new Date(d).getDate().toString().padStart(2, '0');
    return formatedDate;
  }

  getCurrentDateTime(){
    let todayDate = new Date();
    let currentDate = todayDate.getFullYear().toString().padStart(2, '0')+'-'+(todayDate.getMonth()+1).toString().padStart(2, '0')+'-'+todayDate.getDate().toString().padStart(2, '0');
    let currentTime = todayDate.getHours().toString().padStart(2, '0') + ":" + todayDate.getMinutes().toString().padStart(2, '0') + ":" + todayDate.getSeconds().toString().padStart(2, '0');
    this.currentDateTime = {
      'currentDate': currentDate,
      'currentTime': currentTime
    }
    return this.currentDateTime;
  }

  exportCollectionReport(){
    this.get_collection_report();
  }

}
