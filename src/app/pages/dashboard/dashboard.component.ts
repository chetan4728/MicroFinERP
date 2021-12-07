import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
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
  
    this.api._get_dashboard_data({bank_id:20}).subscribe((response)=>{
   
      this.data = response;
    })
  }

}
