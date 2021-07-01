import { LoanService } from './../../../services/loan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  url:any;
  folder_url:any;
  selectRoleRow: any;
  application_status:any;
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
          this.application_status = this.selectRoleRow.approved_status;
          this.url =  environment.uploads+this.selectRoleRow.member_photo_pr;
          this.folder_url = environment.uploads;
         // alert(this.url)
        //  console.log(this.selectRoleRow.member_photo_pr);
          
      });
    }
  }
  update():void{
    this.api._Update_Status({branch_id:this.selectRoleRow.branch_id,loan_application_no: this.selectRoleRow.loan_application_no,approved_status:this.application_status,created_by:this.selectRoleRow.created_by}).subscribe((data) => {
    
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Update Succssfully...',
        showConfirmButton: false,
        timer: 1500
      });
      this.api._get_single_loans({loan_application_no: this.param.snapshot.paramMap.get('id')}).subscribe((data) => {
        this.selectRoleRow = data;
        this.application_status = this.selectRoleRow.approved_status;
        this.url =  environment.uploads+this.selectRoleRow.member_photo_pr;
        this.folder_url = environment.uploads;
      
    });
     // alert(data)
  });
    
   
  }
}
