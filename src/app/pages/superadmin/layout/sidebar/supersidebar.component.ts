import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
@Component({
  selector: 'app-supersidebar',
  templateUrl: './supersidebar.component.html',
  styleUrls: ['./supersidebar.component.scss']
})
export class SupersidebarComponent implements OnInit {
  SessionData: any;
  Role:any;
  constructor(public local: LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.Role =  this.SessionData.role_code;
    console.log(this.Role);
  }

}
