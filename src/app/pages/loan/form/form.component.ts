import { LoanService } from './../../../services/loan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  url:any;
  selectRoleRow: any;
  constructor(private param: ActivatedRoute ,private api: LoanService) { }

  ngOnInit(): void {
    this.getListing();
  }
  getListing():void{
    const id = this.param.snapshot.paramMap.get('id');
    if (id != null)
    {
      //alert(id)
      this.api._get_single_loans({loan_application_no: id}).subscribe((data) => {
          this.selectRoleRow = data;
          this.url =  environment.uploads+this.selectRoleRow.member_photo_pr;
         // alert(this.url)
        //  console.log(this.selectRoleRow.member_photo_pr);
          
      });
    }
  }
}
