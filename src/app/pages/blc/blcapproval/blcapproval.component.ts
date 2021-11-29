import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Event } from '@angular/router';
import { CurrencyPipe } from "@angular/common";
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from 'angular-web-storage';
import {formatDate} from '@angular/common';
import { LoanDisbursementService } from 'src/app/services/loan.disbursement.service';
@Component({
  selector: 'app-blcapproval',
  templateUrl: './blcapproval.component.html',
  styleUrls: ['./blcapproval.component.scss']
})
export class BlcapprovalComponent implements OnInit {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  GroupData:any;
  members:any;
  Url:any;
  formattedAmount;
  intrest_type:any;
  acutal_members:Number = 0;
  SessionData: any;
   total_amount: any;
   intrest: any;
   term: any;
   monthly_emi: any;
   monthly_intrest: any;
   Principle_amount: any;
   disburstment_date:any;
   emi_date:any;
   total_payments:any = 0;
   total_intrest:any = 0;
   total_intrest_in_per:any = 0;
   interest_table:any;
   blc_status:any="";
   members_ids:any;
   is_blc_verfied:any="";
   row:any;
  constructor(public local: LocalStorageService,private router: Router,private route: Router,private currencyPipe: CurrencyPipe, private param: ActivatedRoute ,private api: LoanDisbursementService) { }

  ngOnInit(): void {
    //alert()
    this.SessionData = this.local.get(environment.userSession);
    this.intrest = "";
    this.intrest_type = this.SessionData.bank_intrest_type;

 
    const branch_id = this.param.snapshot.paramMap.get('branch_id');
    const area_id = this.param.snapshot.paramMap.get('area_id');
    const center_id = this.param.snapshot.paramMap.get('center_id');
    const group_id = this.param.snapshot.paramMap.get('group_id');
    const action = this.param.snapshot.paramMap.get('action');
    const loan_distribution_id = this.param.snapshot.paramMap.get('distribution_id');
    this.Url = environment.uploads;

    if(action=="edit")
    {
      this.api._get_loan_distribution_applications_data({bank_id:this.SessionData.bank_id,loan_distribution_id:loan_distribution_id,branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data => {
        this.row =  data['loan_details'];
        this.total_amount = this.row.total_loan_amount;
        this.term = this.row.term_year;
        this.intrest = this.row.anual_percentage_rate;
        this.disburstment_date = this.row.disburstment_date;
        this.emi_date = this.row.emi_date;
        this.monthly_emi = this.row.monthly_emi;
        this.monthly_intrest = this.row.monthly_intrest;
        this.total_payments = this.row.total_payments;
        this.total_intrest =   this.row.total_intrest;
        this.total_intrest_in_per = this.row.total_intrest_in_per;
        //alert(JSON.stringify(this.row))
        this.blc_status =   this.row.blc_approved;
        });
    }
    
    
    
    this.api._get_group_details({branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      //console.log(data);
      
      this.GroupData = data;
      
     });


     this.api._get_group_members({branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      //console.log(data);
      
      this.members = data;
      
      this.members_ids = [];
      for(let i=0;i< this.members.length;i++)
      {
        //this.acutal_members =this.members[i].member_limit;
        this.members_ids.push(this.members[i].loan_application_number)
        if(this.members[i].approved_status==1 && isNaN(this.members[i].approved_status)!=true)
        {
          //alert(this.members[i].approved_status)
          this.acutal_members = parseInt(this.acutal_members + this.members[i].approved_status);
         
        }
      }
     
      
     });


  }
  
  numberOnly(event): boolean {
    let value = event.target.value;
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
     let current: string = value;
      const position = event.target.selectionStart;
      const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
      if (next && !String(next).match(this.regex)) {
       event.preventDefault();
      }
   
  }

  
      
  
  submitData():void{

    const branch_id = this.param.snapshot.paramMap.get('branch_id');
    const area_id = this.param.snapshot.paramMap.get('area_id');
    const center_id = this.param.snapshot.paramMap.get('center_id');
    const group_id = this.param.snapshot.paramMap.get('group_id');
    var param = {
      branch_id:branch_id,
      area_id:area_id,
      center_id:center_id,
      group_id:group_id,
      total_loan_amount:this.total_amount,
      loan_members:this.GroupData.member_limit,
      anual_percentage_rate:this.intrest,
      term_year:this.term,
      intrest_product:this.intrest,
      bank_intrest_type:this.intrest_type,
      bank_id:this.SessionData.bank_id,
      blc_approved:this.blc_status,
      disbursment_number:this.param.snapshot.paramMap.get('distribution_id')
  };


    if(this.param.snapshot.paramMap.get('action')=="add")
    {
    if(0)
    //if(this.GroupData.member_limit!=this.members.length)
    {
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'error',
        title: 'Please Add All Member',
        showConfirmButton: false,
        timer: 1500
      });
    }
  
    else if(0)
    //else if(this.GroupData.member_limit!=this.acutal_members)
    {
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'error',
        title: 'Verify All Group Member',
        showConfirmButton: false,
        timer: 1500
      });
    }

    else if(this.total_amount==null)
    //else if(this.GroupData.member_limit!=this.acutal_members)
    {
      Swal.fire({
     
        toast: true,
        icon: 'error',
        title: 'Please Enter Amount',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if(this.term==null)
    //else if(this.GroupData.member_limit!=this.acutal_members)
    {
      Swal.fire({
     
        toast: true,
        icon: 'error',
        title: 'Please Select Loan Term',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if(this.intrest==null)
    //else if(this.GroupData.member_limit!=this.acutal_members)
    {
      Swal.fire({
     
        toast: true,
        icon: 'error',
        title: 'Please Select Intrest Type',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if(this.blc_status==null)
    //else if(this.GroupData.member_limit!=this.acutal_members)
    {
      Swal.fire({
     
        toast: true,
        icon: 'error',
        title: 'Please Select Status',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else
    {
     

    this.api._create_Blc_loan_distribution(param).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Group Loan Disbursement Created',
        showConfirmButton: false,
        timer: 1500
      });
     this.route.navigate(['/blc-approval']);
    });
    }
  }
  else if(this.param.snapshot.paramMap.get('action')=="edit")
  {
    this.api._update_Blc_loan_distribution(param).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Group Loan Disbursement Updated',
        showConfirmButton: false,
        timer: 1500
      });
      this.route.navigate(['/blc-approval']);
    });
  }

  }
  update_status(event,loan_application_number)
  {
    this.api._update_blc_status({loan_application_number:loan_application_number,status:event.target.value}).subscribe(data => {
    })
   
  }
  viewForm(data): void
  {

    this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);
  }
}