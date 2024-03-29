import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  SessionData: any;
  Role:any;
  constructor(public local: LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.Role =  this.SessionData.role_code;
    console.log("role---"+this.Role);
  }

}
