import { Role } from './../../../model/role';
import { EmiService } from './../../../services/emi.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { LocalStorageService } from 'angular-web-storage';
import { Subject } from 'rxjs';
import { LoanDisbursementService } from 'src/app/services/loan.disbursement.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { BranchService } from '../../../services/branch.service';
import { AreaService } from '../../../services/area.service';
@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.scss']
})
export class EmiComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  SessionData: any;
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
  filter:any = [];
  emiData: any[]= [];
  branchData: any=[] = [];
  areaData: any=[] = [];
  area_id:any;
  constructor(private router: Router, private branch_api:BranchService,public area_api :AreaService,private api: EmiService,private local :LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
   

    this.loadArea();
    this.getListing();
    this.Url = environment.uploads;
  }
  getListing():void{
      this.api._get_loan_emi_data({bank_id:this.SessionData.bank_id}).subscribe(data  => {
        this.ListingData = data;
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



  



  loadArea()
  {
    this.api._get_area({bank_id:this.SessionData.bank_id}).subscribe(data => {
      this.AreaList = data;
      this.area_dp =  this.SessionData.area_id ? this.SessionData.area_id : "";  
   //   console.log(this.SessionData)
      if(this.SessionData.role_code=="BM")
      {
        this.AreaList.find((v) => { 
          if(v.area_id == this.area_dp){
            this.areaData.push(v);
          }
        });
        this.AreaList = this.areaData;
        this.onChangeArea(this.SessionData.area_id)
      }
  });
  }

  onChangeBranch(branch_id):void{

   this.api._get_centers({bank_id:this.SessionData.bank_id,branch_id:this.branch_dp,area_id:this.area_dp}).subscribe(data => {
      this.CenterList = data;
  });

       
   
  }

  onChangeArea(id):void{
 
    this.api._get_branch({bank_id:this.SessionData.bank_id,area_id:id}).subscribe(data => {
      this.BranchList = data;
      this.branch_dp =  this.SessionData.employee_branch_id ?  this.SessionData.employee_branch_id : "";
      if(this.SessionData.role_code=="BM")
      {
        this.BranchList.find((v) => { 
          if(v.branch_id == this.branch_dp){
            this.branchData.push(v);
          }
        });
        this.BranchList = this.branchData;
         this.onChangeBranch(null);
      }
      
    
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
    this.router.navigate(['/emi/view-emi/' + data.branch_id +'/' +data.area_id +'/' +data.center_id +'/' +data.group_id +"/view/"+data.disbursment_number]);
    //this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);

    
  }

 

}
