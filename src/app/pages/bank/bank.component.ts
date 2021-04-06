import { BankService } from './../../services/bank.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  url: any;
  SessionData: any;
  bank_name:any;
  bank_tag_line:any;
  bank_app_url:any;
  bank_app_key_code:any;
  bank_email:any;
  bank_contact_no:any;
  bank_registration_no:any;
  bank_logo:any;
  bank_state:any;
  bank_district:any;
  bank_address:any;
  bank_area_code:any;
  bank_status:any;
  row:any;
  constructor( private api: BankService,private local :LocalStorageService) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);

    this.api._get({bank_id:this.SessionData.bank_id}).subscribe(data  => {
      //console.log(data);
      this.row = data;
      this.bank_name = this.row.bank_name;
     // alert(this.bank_name)
      this.bank_tag_line = this.row.bank_tag_line;
      this.bank_app_url = this.row.bank_app_url;
      this.bank_app_key_code = this.row.bank_app_key_code;
      this.bank_email = this.row.bank_email;
      this.bank_contact_no = this.row.bank_contact_no;
      this.bank_registration_no = this.row.bank_registration_no;
      this.bank_logo = this.row.bank_logo;
      this.bank_state = this.row.bank_state;
      this.bank_district = this.row.bank_district;
      this.bank_address = this.row.bank_address;
      this.bank_area_code = this.row.bank_area_code;
      this.bank_status = this.row.bank_status;

  });
  }
   

}
