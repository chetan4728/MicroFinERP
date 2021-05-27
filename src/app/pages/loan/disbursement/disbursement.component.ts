import { LoanDisbursementService } from '../../../services/loan.disbursement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.scss']
})
export class DisbursementComponent implements OnInit {

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
 
  constructor(private router: Router, private api: LoanDisbursementService,private local :LocalStorageService) { }

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
    this.api._get_branch({bank_id:this.SessionData.bank_id}).subscribe(data => {
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
    this.router.navigate(['/disbursement/LoanDisbursementForm/' + data.branch_id +'/' +data.area_id +'/' +data.center_id +'/' +data.group_id +"/edit/"+data.loan_distribution_id]);
    //this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);

    
  }

  addLoan():void{

    if(this.branch_dp=="")
    {

      Swal.fire({
       
        toast: true,
        icon: 'error',
        title: 'Select Branch',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if(this.area_dp=="")
    {
      Swal.fire({
       
        toast: true,
        icon: 'error',
        title: 'Select Area',
        showConfirmButton: false,
        timer: 1500
      });
      
    }
    else if(this.center_dp=="")
    {

      Swal.fire({
       
        toast: true,
        icon: 'error',
        title: 'Select Center',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if(this.group_dp=="")
    {

      Swal.fire({
       
        toast: true,
        icon: 'error',
        title: 'Select Group',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else
    {
       this.router.navigate(['/disbursement/LoanDisbursementForm/' + this.branch_dp +'/' +this.area_dp +'/' +this.center_dp +'/' +this.group_dp+"/add/"+0]);
    }
  }

  filterData(): void
  {
    var a = [];

    if(this.branch_dp!="")
    {

      a.push({branch_id:this.branch_dp});
    }
    if(this.area_dp!="")
    {
      a.push({area_id:this.area_dp});
    }

    if(this.center_dp!="")
    {
      a.push({center_id:this.center_dp});
    }
    if(this.group_dp!="")
    {
      a.push({group_id:this.group_dp});
    }
  
    this.api._get_loans_filter(a).subscribe(data => {
      this.ListingData = data;
    
  });

  }


}
