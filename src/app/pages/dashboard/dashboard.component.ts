import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public local: LocalStorageService,private api:DashboardService) { }
  SessionData: any;
  data:any;
  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
   
    this.api._get_dashboard_data({bank_id:this.SessionData.bank_id}).subscribe((response)=>{
        this.data = response;
    })
  }

}
