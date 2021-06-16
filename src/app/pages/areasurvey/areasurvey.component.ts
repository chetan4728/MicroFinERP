import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { LocalStorageService } from 'angular-web-storage';
import { Subject } from 'rxjs';
import { SurveyService } from 'src/app/services/survey.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-areasurvey',
  templateUrl: './areasurvey.component.html',
  styleUrls: ['./areasurvey.component.scss']
})
export class AreasurveyComponent implements OnInit {
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

  viewSurvey(id):void{
      
         this.router.navigate(['/area-survey/viewsurivey/' + id]);
  }
  getListing():void{

    this.api._getAreaSurveys({bank_id:this.SessionData.bank_id}).subscribe(data  => {
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
