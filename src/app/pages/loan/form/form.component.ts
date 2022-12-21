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
  saving_account_number:any;
  external_loan_account_number:any;
  loan_account_number:any;
  applicantName:string;
  gender:string;
  dob:string;
  uid_no:string;
  coapplicantName:string;
  pan_card_no:string;
  nominee_name:string;
  constructor(private param: ActivatedRoute ,private api: LoanService) { }

  ngOnInit(): void {
    this.getListing();
  }
  getListing():void{
    const id = this.param.snapshot.paramMap.get('id');
    if (id != null)
    {
      this.api._get_single_loans({loan_application_no: id}).subscribe((data) => {
          this.selectRoleRow = data;
         
          this.applicantName = this.selectRoleRow.applicant_name;
          this.gender = this.selectRoleRow.gender;
          this.dob = this.selectRoleRow.dob;
          this.uid_no = this.selectRoleRow.uid_no;
          this.coapplicantName = this.selectRoleRow.co_name
          this.pan_card_no = this.selectRoleRow.pan_card_no;
          this.nominee_name =   this.selectRoleRow.nominee_name;
          this.application_status = this.selectRoleRow.approved_status;
          this.url =  environment.uploads+this.selectRoleRow.member_photo_pr;
          this.folder_url = environment.uploads;
          this.saving_account_number  = this.selectRoleRow.saving_account_number;
          this.external_loan_account_number  = this.selectRoleRow.external_loan_account_number;
          this.loan_account_number  = this.selectRoleRow.loan_account_number;
       
      });
    }
  }
  update():void{
    
    let _data = {
      branch_id:this.selectRoleRow.branch_id,
      loan_application_no: this.selectRoleRow.loan_application_no,
      saving_account_number: this.selectRoleRow.saving_account_number,
      external_loan_account_number: this.selectRoleRow.external_loan_account_number,
      loan_account_number: this.selectRoleRow.loan_account_number,
      approved_status:this.application_status,
      created_by:this.selectRoleRow.created_by,
      applicant_name:this.applicantName,
      gender:this.gender,
      dob:this.dob,
      uid_no:this.uid_no,
      co_name:this.coapplicantName,
      pan_card_no:this.pan_card_no,
      nominee_name:this.nominee_name,
    };


    this.api._Update_Status(_data).subscribe((data) => {
    
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
