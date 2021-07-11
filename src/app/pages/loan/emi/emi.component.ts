import { EmiService } from './../../../services/emi.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { LocalStorageService } from 'angular-web-storage';
import { Subject } from 'rxjs';
import { LoanDisbursementService } from 'src/app/services/loan.disbursement.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
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
  constructor(private router: Router, private api: EmiService,private local :LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.loadBranch();
    this.getListing();
    this.Url = environment.uploads;
  }
  getListing():void{
      this.api._get_loan_distribution_applications({bank_id:this.SessionData.bank_id}).subscribe(data  => {
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

  loadBranch():void{
    this.api._get_branch().subscribe(data => {
      this.BranchList = data;
   });
  }

  onChangeBranch(id):void{
    //alert(id)
    this.api._get_area({branch_id:id}).subscribe(data => {
      this.AreaList = data;
  });
  }

  onChangeArea(id):void{
    //alert(id)
    this.api._get_centers({area_id:id}).subscribe(data => {
      this.CenterList = data;
  });
  }

  onChangeCenter(id):void{
    //alert(id)
    this.api._get_groups({center_id:id}).subscribe(data => {
      this.GroupList = data;
    
  });
  }
  

  viewForm(data): void
  {
    this.router.navigate(['/emi/view-emi/' + data.branch_id +'/' +data.area_id +'/' +data.center_id +'/' +data.group_id +"/view/"+data.loan_distribution_id]);
    //this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);

    
  }

 

}
