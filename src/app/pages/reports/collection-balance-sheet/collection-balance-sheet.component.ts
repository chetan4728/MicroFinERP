import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';  
import { LocalStorageService } from 'angular-web-storage';
import { ReportsService } from '../../../services/reports.service';
import { environment } from '../../../../../src/environments/environment.prod';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-collection-balance-sheet',
  templateUrl: './collection-balance-sheet.component.html',
  styleUrls: ['./collection-balance-sheet.component.scss']
})
export class CollectionBalanceSheetComponent implements OnInit {
  
  // @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  jsonData: any;
  ListingData: any;
  currentDateTime: any; 
  sessiondata:any;

  constructor(private api:ReportsService,private session:LocalStorageService) { }

  ngOnInit(): void {
    this.sessiondata = this.session.get(environment.userSession);
    this.get_collection_balance_sheet();
  }

  get_collection_balance_sheet(){
      this.getCurrentDateTime();
      // console.log("this.sessiondata.bank_id", this.sessiondata.bank_id);
      this.api.get_collection_balance_sheet({bank_id:this.sessiondata.bank_id}).subscribe(data=>{
        this.ListingData = data; 
        // console.log("data", this.ListingData);
           
        
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

  exportCollectionBalanceSheet(){
    this.jsonData = this.ListingData;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData, {header: []});  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, "Daily Balance Report_"+this.currentDateTime.currentDate+'.xlsx',{ bookType: 'xlsx', type: 'buffer' });   
  }

}
