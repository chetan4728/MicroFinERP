import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { LocalStorageService } from 'angular-web-storage';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { BranchService } from '../../../services/branch.service';
import { AreaService } from '../../../services/area.service';
import { EmiService } from './../../../services/emi.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  SessionData: any;
  ListingData:any;
  loanData: any;
  BranchList: any;
  AreaList: any;
  CenterList: any;
  GroupList: any;
  Url:any;
  branch_dp:any ="";
  area_dp:any="";
  center_dp:any="";
  group_dp:any="";
  filter:any = [];
  emiData: any[]= [];
  paid_member: any[]= [];
  branchData: any=[] = [];
  areaData: any=[] = [];
  area_id:any;
  constructor(private router: Router, private branch_api:BranchService,public area_api :AreaService,private api: EmiService,private local :LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.area_dp =  this.SessionData.employee_branch_id;
    this.branch_dp =  this.SessionData.employee_branch_id;
    this.loadArea();
    this.getListing();
    this.Url = environment.uploads;
  }
  getListing():void{
      this.api._get_recovery_loan_emi_data({bank_id:this.SessionData.bank_id}).subscribe(data => {
        this.loanData = data;
        this.loanData.forEach(el => {
          if(el.member_status == "true"){
            this.paid_member.push(el.loan_data);
          }
        });
        this.ListingData = this.paid_member;
        if(this.SessionData.role_code == 'BM'){
          this.ListingData.find((v) => {                        
            if(v.branch_id == this.SessionData.employee_branch_id){
              this.emiData.push(v);
            }
          });
          this.ListingData = this.emiData;
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

  onChangeArea(id):void{
    //alert(id)
    this.branch_api._get_branch({bank_id:this.SessionData.bank_id,area_id:id}).subscribe(data => {
      this.BranchList = data;
      if(this.SessionData.role_code == 'BM'){
        this.BranchList = this.BranchList.find((v) => { return v.branch_id == this.SessionData.employee_branch_id });
        this.branchData.push(this.BranchList);
        this.BranchList = this.branchData;
        this.onChangeBranch(this.SessionData.employee_branch_id);
      };
    });
  }

  
  onChangeBranch(id):void{

    this.api._get_centers({bank_id:this.SessionData.bank_id,branch_id:id,area_id:this.area_id}).subscribe(data => {
      this.CenterList = data;     
      this.onChangeCenter(id);
  });
  }

  onChangeCenter(id):void{
    //alert(id)
    this.api._get_groups({center_id:id,bank_id:this.SessionData.bank_id,area_id:id}).subscribe(data => {
      this.GroupList = data;
    
  });
  }
  

  viewForm(data): void
  {
    this.router.navigate(['/recovery/view-recovery/' + data.branch_id +'/' +data.area_id +'/' +data.center_id +'/' +data.group_id +"/view/"+data.disbursment_number]);
    //this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);

    
  }

  loadArea():void{
    this.area_api._get_area({bank_id:this.SessionData.bank_id,token:this.SessionData.token}).subscribe(data => {
      this.AreaList = data;
      if(this.SessionData.role_code == 'BM'){        
        this.AreaList = data.find((v) => { return v.area_id == this.SessionData.employee_branch_id});
        this.areaData.push(this.AreaList);
        this.AreaList =  this.areaData;
        this.onChangeArea(this.SessionData.employee_branch_id);
      }
   });
  } 

}

