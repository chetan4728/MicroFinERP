import { LoanService } from './../../services/loan.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

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
  filter:any = [];
  constructor(private router: Router, private api: LoanService,private local :LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);

    this.getListing();
    this.loadArea();
    this.Url = environment.uploads;
  }
  getListing():void{
    this.api._get_loans({bank_id:this.SessionData.bank_id}).subscribe(data  => {
      console.log(data);
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
    this.api._get_groups({center_id:id}).subscribe(data => {
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
