import { Component, OnInit } from '@angular/core';
import { LoanDisbursementService } from '../../../../services/loan.disbursement.service';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { CurrencyPipe } from "@angular/common";
import Swal from 'sweetalert2';
declare var $: any;
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from 'angular-web-storage';
import {formatDate} from '@angular/common';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-loan-disbursement',
  templateUrl: './loan-disbursement.component.html',
  styleUrls: ['./loan-disbursement.component.scss']
})
export class LoanDisbursementComponent implements OnInit {

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
   members_ids:any;
   row:any;
   is_submited:any;
   Form: FormGroup;
   temp_loan_app_no:any;
   saving_account_number:any;
   external_loan_account_number:any;
   loan_account_number:any;
   wel_faire_amt:any;
   insurance_pre:any;
   approvedMembers:any[] = [];
  constructor(private formBuilder: FormBuilder,public local: LocalStorageService,private router: Router,private route: Router,private currencyPipe: CurrencyPipe, private param: ActivatedRoute ,private api: LoanDisbursementService,) 
  {
    this.initForm();
   
   }

  ngOnInit(): void {
    //alert()
  
    this.SessionData = this.local.get(environment.userSession);
    this.intrest = "";
    this.intrest_type = this.SessionData.bank_intrest_type;

    this.getDate();
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
         this.getEmiTable();
          
        });
    }
    
    
    
    this.api._get_group_details({branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      //console.log(data);
      
      this.GroupData = data;
      
     });


     this.api._get_approved_group_members({bank_id:this.SessionData.bank_id,branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      //console.log(data);
      
      this.members = data;      
      this.members.forEach((m)=>{
        if (m.approved_status == 1){
          this.approvedMembers.push(m);
        }
      })
      this.members = this.approvedMembers;
      
      this.members_ids = [];
      for(let i=0;i< this.members.length;i++)
      {
        //this.acutal_members =this.members[i].member_limit;
        this.members_ids.push(this.members[i].loan_application_number)
        //  console.log("this.members[i]agduowagd", this.members[i], "qwyduiqwdyug" ,this.members[i].approved_status);
        //  console.log("approved_status",this.members[i].approved_status , "check" , this.members[i].approved_status== 1);        
        if(this.members[i].approved_status==1 && isNaN(this.members[i].approved_status)!=true)
        {
          //alert(this.members[i].approved_status)
          this.acutal_members = parseInt(this.acutal_members + this.members[i].approved_status);
         
        }
      }
     
      
     });


  }

  initForm(): void {

    this.Form = this.formBuilder.group({
      saving_account_number: ['', Validators.required],
      loan_account_number: ['', Validators.required],
      external_loan_account_number: ['', Validators.required],
      wel_faire_amt: [''],
      loan_application_nu:[''],
      insurance_pre:['']

    });
  }

  submit()
  {
    //alert(this.Form.value)
    this.api._add_loan_account_detailss(this.Form.value).subscribe( data=>{
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Loan Details Added',
        showConfirmButton: false,
        timer: 1500
      });
      location.reload();
    });
  }
  transformAmount(element) {
   
  }

  payFeqFun(Event):void
  {
   
       
  }

  int_product_dp(Event):void
  {
   
  }

  intFrqFun(Event):void
  {
    
  }

  getDate():void{
    


  }

  getEmiTable():void{
    this.interest_table = [];
    var dateSrt = new Date(this.emi_date);
    var currentDay = dateSrt.getDate();
    var dis_date_f:any = new Date(this.disburstment_date);
    var emi_date_f:any = new Date(this.emi_date);
    this.monthly_intrest = (this.intrest / 12).toFixed(2);
    this.monthly_emi = this.PMT(this.monthly_intrest/100, this.term, this.total_amount);
  

    for (let i = 0; i < this.term; i++) {
      
      if (i == 1) {
           var currentMonth = dateSrt.getMonth();
           dateSrt.setMonth(currentMonth, currentDay);
            if (dateSrt.getMonth() > currentMonth) {
                dateSrt.setDate(0);
            }
        //  console.log("dateSrt", dateSrt);
         
            var txtDay = formatDate(dateSrt, 'yyyy-MM-dd', 'en-US');
            // console.log("txtDay",txtDay);
            var diffTime:any = Math.abs(dis_date_f - emi_date_f);
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            var old_date:any = new Date(formatDate(dateSrt, 'yyyy-MM-dd', 'en-US')); 


            var begining_balance:any = this.total_amount;
            
            var emi_intrest:any = (((this.total_amount * this.intrest / 365) *  diffDays) /100).toFixed(2);
            // var emi_intrest:any = this.roundToNearest((((this.total_amount * this.intrest / 365) *  diffDays) /100).toFixed(2), 10);
            var emi:any = this.PMT(this.monthly_intrest/100,this.term,this.total_amount);

            this.total_payments =  parseFloat(emi) ;
            this.total_intrest = parseFloat(emi_intrest) ;
            var priciple_amount:any =  emi - emi_intrest;
            // var priciple_amount:any =   this.roundToNearest(emi,10) - emi_intrest;
            var ending_balance:any  = Math.round(begining_balance) - (this.roundToNearest(emi,10) - emi_intrest) // this.total_amount - priciple_amount;
            this.interest_table.push({
              no:i,
                    inc_date: txtDay,
                    diffDays: diffDays,
                    begining_balance: begining_balance , //Math.round(begining_balance),
                    schedule_payment: this.roundToNearest(emi,10),
                    interest_paid: emi_intrest, // Math.round(emi_intrest),
                    principle_paid: this.roundToNearest(emi,10) - emi_intrest, // Math.round(priciple_amount),
                    ending_balance: ending_balance //Math.round(ending_balance),
                });
        }
        if (i >= 1) {

          var currentMonth = dateSrt.getMonth();
          dateSrt.setMonth(currentMonth + 1, currentDay);
          if (dateSrt.getMonth() > currentMonth + 1) {
              dateSrt.setDate(0);
          }
          var txtDay = formatDate(dateSrt, 'yyyy-MM-dd', 'en-US');
          var newDay:any = new Date(formatDate(dateSrt, 'yyyy-MM-dd', 'en-US'));
  
          var diffTime:any = Math.abs(old_date - newDay);
          var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   
          var old_date:any = new Date(formatDate(dateSrt, 'yyyy-MM-dd', 'en-US'));

          var begining_balance:any = ending_balance;
          
          var emi_intrest:any = (((begining_balance * this.intrest / 365) *  diffDays) /100).toFixed(2);
          // var emi_intrest:any = this.roundToNearest((((begining_balance * this.intrest / 365) *  diffDays) /100).toFixed(2), 10);
          var emi:any = this.PMT(this.monthly_intrest/100,this.term,this.total_amount);
          this.total_payments =  Math.round(this.total_payments + parseFloat(emi)) ;

          this.total_intrest =Math.round(this.total_intrest + parseFloat(emi_intrest)) ;
          var priciple_amount:any =  (emi - emi_intrest).toFixed(2);
          // var priciple_amount:any =   this.roundToNearest(emi,10) - emi_intrest;
          var ending_balance:any = begining_balance -  (this.roundToNearest(emi,10) - emi_intrest); //(begining_balance - priciple_amount).toFixed(2);
          
                    if(i!=this.term-1)
                {
                  this.interest_table.push({
                    no:i+1,
                    inc_date: txtDay,
                    diffDays: diffDays,
                    begining_balance:begining_balance, //Math.round(begining_balance),
                    schedule_payment: this.roundToNearest(emi,10),
                    interest_paid: emi_intrest, // Math.round(emi_intrest),
                    principle_paid: this.roundToNearest(emi,10) - emi_intrest, //Math.round(priciple_amount),
                    ending_balance: ending_balance//Math.round(ending_balance),
                  });
                }
                else 
                {
                  var emi_new =  parseFloat(emi_intrest) + parseFloat(begining_balance);
                  this.interest_table.push({
                    no:i+1,
                    inc_date: txtDay,
                    diffDays: diffDays,
                    begining_balance:begining_balance,//Math.round(begining_balance),
                    schedule_payment: Math.round(emi_new),
                    interest_paid: emi_intrest, // Math.round(emi_intrest),
                    principle_paid: Math.round(emi_new) - emi_intrest ,//Math.round(begining_balance),
                    ending_balance: 0,
                  });
			}
       
        }
    }

     this.total_intrest_in_per =   ((this.total_intrest / this.total_amount) * 100).toFixed(2)+"%";
  }
   roundToNearest(numToRound, numToRoundTo) {
    return Math.round(numToRound / numToRoundTo) * numToRoundTo;
}
  get_loan_term(Event):void
  {
   
  }

  PMT(ir,np, pv, fv = 0) {
 var presentValueInterstFector = Math.pow((1 + ir), np);
 var pmt = ir * pv  * (presentValueInterstFector + fv)/(presentValueInterstFector-1); 
 return pmt.toFixed(2);
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

  pmt_cal():void
  {
    
    if(this.total_amount=="" || this.total_amount == undefined)
    {
        Swal.fire({
          position: 'center',
          toast: true,
          icon: 'warning',
          title: 'You must entered loan amount',
          showConfirmButton: false,
          timer: 1500
        });
  }
  else 
      if(this.term=="" || this.term == undefined)
      {
          Swal.fire({
            position: 'center',
            toast: true,
            icon: 'warning',
            title: 'You must add loan terms in months',
            showConfirmButton: false,
            timer: 1500
          });
    }
 else 
      if(this.intrest=="" || this.intrest == undefined)
      {
          Swal.fire({
            position: 'center',
            toast: true,
            icon: 'warning',
            title: 'You must select loan intrest product',
            showConfirmButton: false,
            timer: 1500
          });
    }
 
    else 
    if(this.disburstment_date=="" || this.disburstment_date == undefined)
    {
        Swal.fire({
          position: 'center',
          toast: true,
          icon: 'warning',
          title: 'You must select loan disburstment date',
          showConfirmButton: false,
          timer: 1500
        });
  }
  else 
    if(this.emi_date=="" || this.emi_date == undefined)
    {
        Swal.fire({
          position: 'center',
          toast: true,
          icon: 'warning',
          title: 'You must select loan emi date',
          showConfirmButton: false,
          timer: 1500
        });
  }
  else
  {
    this.getEmiTable();
  }
      
  }
  submitData():void{

    const branch_id = this.param.snapshot.paramMap.get('branch_id');
    const area_id = this.param.snapshot.paramMap.get('area_id');
    const center_id = this.param.snapshot.paramMap.get('center_id');
    const group_id = this.param.snapshot.paramMap.get('group_id');
    var param = {
     
      total_loan_amount:this.total_amount,
      loan_members:this.GroupData.member_limit,
      anual_percentage_rate:this.intrest,
      term_year:this.term,
      disburstment_date:this.disburstment_date,
      emi_date:this.emi_date,
      principle_amount:this.Principle_amount,
      monthly_intrest:this.monthly_intrest,
      monthly_emi:this.monthly_emi,
      total_payments:this.total_payments,
      total_intrest:this.total_intrest,
      total_intrest_in_per:this.total_intrest_in_per,
      loan_data_emi:this.interest_table,
      members_id:this.members_ids,
      intrest_product:this.intrest,
      bank_intrest_type:this.intrest_type,
      bank_id:this.SessionData.bank_id,
      loan_distribution_id:this.param.snapshot.paramMap.get('distribution_id'),
      status:1
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
    else
    {
     

    this.api._create_loan_distribution(param).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Group Loan Disbursement Created',
        showConfirmButton: false,
        timer: 1500
      });
     this.route.navigate(['/disbursement']);
    });
    }
  }
  else if(this.param.snapshot.paramMap.get('action')=="edit")
  {
    this.api._update_loan_distribution(param).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Group Loan Disbursement Updated',
        showConfirmButton: false,
        timer: 1500
      });
      this.route.navigate(['/disbursement']);
    });
  }

  }

  viewForm(data): void
  {

    this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);
  }

  account_detail(row)
  {
  //  alert( row.loan_application_number)
    this.temp_loan_app_no = row.loan_application_number;

    this.saving_account_number = row.saving_account_number
    
 
    if(row.external_loan_account_number=="")
    {
      this.external_loan_account_number =  Math.floor(Math.random() * (9999999999 - 10000000)) + 10000000;
    }
    else
    {
      this.external_loan_account_number = row.external_loan_account_number
    }
  
    this.loan_account_number = row.loan_account_number
    this. wel_faire_amt = row.wel_faire_amt
    this. insurance_pre = row.insurance_pre
    $('#myModal').modal('show');
  }

  close()
  {
    $('#myModal').modal('hide');
  }
}
