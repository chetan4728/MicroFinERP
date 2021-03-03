import { Branch } from './../../../../model/branch';
import { SurveyService } from './../../../../services/survey.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
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
  getListing():void{

  this.api._get_survey({branch_id:this.SessionData.employee_branch_id}).subscribe(data  => {
    console.log(data);
    this.ListingData = data;
});

  }

}
