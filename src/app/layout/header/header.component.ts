import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  SessionData: any;
  Role:any;
  Bank_name:any;
  constructor(public local: LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.Role =  this.SessionData.role_code;
    this.Bank_name = this.SessionData.bank_name;
//console.log(this.SessionData);
   // console.log(this.Role);
  }

}
