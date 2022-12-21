import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  SessionData: any;
  Role:any;
  Bank_name:any;
  emp_id:any
  constructor(public local: LocalStorageService,private router: Router) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.Role =  this.SessionData.role_code;
    this.Bank_name = this.SessionData.bank_name;
    this.emp_id =   this.SessionData.employee_id;
//console.log(this.SessionData);
   // console.log(this.Role);
  }

  edit():void{
    this.router.navigate(['/users/UserEdit/' + this.SessionData.employee_id]);
  }
  logoutbtn()
  {
    this.local.clear();
    window.location.href = '/';

  }
}
