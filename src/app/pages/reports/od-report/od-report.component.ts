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
  selector: 'app-od-report',
  templateUrl: './od-report.component.html',
  styleUrls: ['./od-report.component.scss']
})
export class OdReportComponent implements OnInit {
  
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
    //alert(this.selectedTo)
    this.clicked = false;
    this.api.get_od_report({role:this.sessiondata.role_code,branch_id:this.sessiondata.employee_branch_id, bank_id:this.sessiondata.bank_id, select_from: this.selectedFrom,select_to: this.selectedTo}).subscribe(data=>{
      this.ListingData = data;      
      this.ListingData.forEach(el => {
      
      
         
            let data2Send = {
          
              "Group Name": el.group_name,
              "Customer Name": el.applicant_name,
              "Customer Mobile": el.applicant_mobile_no,
              "EMI NO": el.emi_no,
              "EMI Date": el.inc_date,
              "DPD Days": el.dpd_days,
              "Added By": el.added_by,
            
            }
            this.data2Export.push(data2Send);
          
        
      
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

