
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SurveyService } from 'src/app/services/survey.service';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> =  new Subject();
  SessionData: any;
  ListingData:any;
  constructor( private router: Router, private api:SurveyService,private local :LocalStorageService ) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.getListing();
  }

  add():void{
    this.router.navigate(['/survey/assign-survey']);
  }
  edit(id):void
  {
    //alert(id)
    this.router.navigate(['/survey/assign-survey-edit/'+id+'']);
  }
  delete_row(id):void{
      alert(id)
  }
  getListing():void{

  this.api._get_survey({branch_id:this.SessionData.employee_branch_id,bank_id:this.SessionData.bank_id}).subscribe(data  => {
    //console.log(data);
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

}
