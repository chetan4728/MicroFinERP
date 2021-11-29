import { LoanService } from './../../services/loan.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import * as XLSX from 'xlsx';  
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild(DataTableDirective, {static: false})
  
  
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  SessionData: any;
  area_id:any;
  ListingData:any;
  BranchList: any;
  AreaList: any;
  CenterList: any;
  GroupList: any;
  Url:any;
  branch_dp:any ="";
  area_dp:any="";
  center_dp:any="";
  group_dp:any="";
  activated:any;
  filter:any = [];
  jsonDate:any = [];
  excel_title:any;
  constructor(private router: Router, private api: LoanService,private local :LocalStorageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
   }

  ngOnInit(): void {

    this.SessionData = this.local.get(environment.userSession);

    this.getListing();
    this.loadArea();
    this.Url = environment.uploads;
    //this.activated =  'none';
  }
  ngOnChanges():void{
    
  }
  getListing():void{
    this.api._get_loans({bank_id:this.SessionData.bank_id}).subscribe(data  => {
   //   console.log(data);
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
  });
  }
  loadArea()
  {
    this.api._get_area({bank_id:this.SessionData.bank_id}).subscribe(data => {
      this.AreaList = data;

    
      
  });
  }

  onChangeBranch(id):void{
   
   this.api._get_centers({bank_id:this.SessionData.bank_id,branch_id:id,area_id:this.area_id}).subscribe(data => {
      this.CenterList = data;
  });
   
  }

  onChangeArea(id):void{
    //alert(id)
    this.area_id = id;

    this.api._get_branch({bank_id:this.SessionData.bank_id,area_id:id}).subscribe(data => {
      this.BranchList = data;
      
    
  });

    /*this.api._get_centers({area_id:id}).subscribe(data => {
      this.CenterList = data;

    
   
  });*/
  }
  onChangeCenter(id):void{
    //alert(id)
    this.api._get_groups({center_id:id,bank_id:this.SessionData.bank_id,area_id:id}).subscribe(data => {
      this.GroupList = data;
    
  });
  }
  

  viewForm(data): void
  {

    this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);
  }

  filterData(): void
  {
    var a = [];
    
    if(this.area_dp!="")
    {
      a.push({area_id:this.area_dp});
      a.push({bank_id:this.SessionData.bank_id});
    }
    if(this.branch_dp!="")
    {

      a.push({branch_id:this.branch_dp});
    
    }
   
    if(this.center_dp!="")
    {
      a.push({center_id:this.center_dp});
   
    }
    if(this.group_dp!="")
    {
      a.push({group_id:this.group_dp});
   
    }
  
  
   // alert(JSON.stringify(a))
      this.api._get_loans_filter(a).subscribe(data => {
      this.ListingData = data;
     // this.activated = 'block';;
      console.log(this.ListingData)
      this.excel_title = "HM_"+this.branch_dp+this.area_dp+this.center_dp+this.group_dp;
      this.ListingData.forEach(element => {
      this.jsonDate.push({
        'Customer ID':element.loan_application_number,
        'Branch Name':element.branch_name,
        'Center Name':element.center_name,
        'Group Name':element.group_name,
        'Customer Name':element.applicant_name,
        'DOB':element.dob,
        'Age':element.age,
        'Age On Date':element.loan_application_number,
        'Gender':element.gender,
        'Martial Status':element.marital_status,
        'Co-Applicant Name':element.co_name,
        'Co-applicant Age':element.co_dob,
        'Nominee Name':element.nominee_name,
        'Relationship':element.nominee_relation,
        'Nominee Age':element.nominee_age,
        'Voter Id':null,
        'UID':element.uid_no,
        'PAN':element.pan_card_no,
        'Ration Card':element.ration_card_no,
        'Member Other Id 1 Type Description':element.member_other_proof,
        'Member Other Id No':element.member_pan_card,
        'Mobile No':element.applicant_mob_no,
        'Total Income':element.total_income,
        'Total Expenase':element.outgoing_amount,
        'Religion':element.religion,
        'Cast':element.cast,
        'Address':element.address,
        'Pincode':element.pincode,
        'Current Address':null,
        'State':element.state,
        'City':element.dist,
        'Loan Account No':element.loan_application_number,
        'Loan Originator':element.added_by,
        'Account Opening Date':element.created_date,
        'Loan Purpose':element.loan_purpose,
        'Applciation Date':element.created_date,
        'Sanction Date':element.loan_amount,
        'Disburse Date':null,
        'Last Collection Date':null,
        'Applied Ammount':element.loan_amount,
        'Sanction Amount':element.loan_amount,
        'Disburse Amount':element.loan_amount,
        'No Installments':null,
        'Installment Amount':null,
        'Current Outstanding':null,
        'Overdue':null,
        'DPT':null,


      }
      );
      });
    
  });
  }
  exportHighMarkData()
  {
   
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonDate, {header: ['Customer ID','Branch Name','Center Name','Group Name',
	'Customer Name','DOB','Age','Age On Date','Gender','Martial Status','Co-Applicant Name','Co-applicant Age','Nominee Name','Relationship','Nominee Age','Voter Id','UID','PAN',
	'Ration Card','Mmber Other Id 1 Type Description','Member Other Id No','Mobile No','Total Income','Total Expenase','Religion','Cast','Address','Pincode','Current Address','State',
	'City','Loan Account No','Loan Originator','Account Opening Date','Loan Purpose','Applciation Date','Sanction Date','Disburse Date','Last Collection Date',
	'Applied Ammount','Sanction Amount','Disburse Amount','No Installments','Installment Amount','Current Outstanding','Overdue','DPT']});  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, this.excel_title+'.xlsx',{ bookType: 'xlsx', type: 'buffer' });  
  }
}