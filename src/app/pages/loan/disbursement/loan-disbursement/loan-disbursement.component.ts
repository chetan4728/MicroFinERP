import { Component, OnInit } from '@angular/core';
import { LoanDisbursementService } from '../../../../services/loan.disbursement.service';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { CurrencyPipe } from "@angular/common";
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-loan-disbursement',
  templateUrl: './loan-disbursement.component.html',
  styleUrls: ['./loan-disbursement.component.scss']
})
export class LoanDisbursementComponent implements OnInit {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  GroupData:any;
  members:any;
  Url:any;
  formattedAmount;
  payFrq:any = "Monthly";
  intFrq:any= "Monthly";
  payment_type_period:any= "Beginning of the Period";
  amount;
  apr:any=1;
  lt:any;
  loan_term_years=1;
  
  loan_amount;
  total_loan_amount;
  total_loan_amount_number;
  scheduled_payment:any=0;
  flat_rate_principle_payment:any;
  flat_rate_interest_payment:any;
  flat_rate_total_payment:any;
  flat_rate_final_total_payment:any;
  flat_rate_final_interest_payment:any;
  flat_rate_final_interest_payment_pre:any;
  interest_per_period:any;
  date:any;
  interest_table:any;
  members_ids:any;
  total_interest_paid:any;
  sum_pay_paid:any;
  sum_pay_percentage:any;
  view_data:any;
  int_product:any = 0;
  
  acutal_members:Number = 0;
  constructor(private router: Router,private route: Router,private currencyPipe: CurrencyPipe, private param: ActivatedRoute ,private api: LoanDisbursementService,) { }

  ngOnInit(): void {
    //alert()
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
      this.api._get_loan_distribution_applications_data({loan_distribution_id:loan_distribution_id,branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data => {
             this.view_data = data;
            //console.log(data);
            this.total_loan_amount = this.view_data.total_loan_amount;
            this.loan_amount = this.view_data.loan_amount_per_member;
            this.apr = this.view_data.anual_percentage_rate;
            this.loan_term_years = this.view_data.term_year;
            this.pmt_cal();
           // alert(this.total_loan_amount)
          
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
        this.members_ids.push(this.members[i].loan_application_no)
        if(this.members[i].approved_status==1 && isNaN(this.members[i].approved_status)!=true)
        {
          //alert(this.members[i].approved_status)
          this.acutal_members = parseInt(this.acutal_members + this.members[i].approved_status);
         
        }
      }

      
     
      
     });

     this.lt = this.loan_term_years * 12;
  }
  transformAmount(element) {
    //alert(this.total_loan_amount)
    this.total_loan_amount_number = this.total_loan_amount;
    this.loan_amount = Math.round((this.total_loan_amount)).toFixed(2);

   
    this.total_loan_amount = this.currencyPipe.transform(
      this.total_loan_amount_number,
      "₹"
    );

    element.target.value = this.total_loan_amount;
  }

  payFeqFun(Event):void
  {
    this.payFrq = Event;
       
  }

  int_product_dp(Event):void
  {
    this.int_product = Event;
       
  }

  intFrqFun(Event):void
  {
    
  }

  getDate():void{
    var d=new Date();
    var year=d.getFullYear();
    var month:any =d.getMonth()+1;
    var day:any =d.getDate();
        if (month<10){
        month = "0"+month;
        };
        if (day<10){
          day = "0"+day;
          };
       
        this.date= year + "-" + month + "-" + day;
  }

  getEmiTable():void{
  // console.log("ddd"+this.scheduled_payment)
     this.interest_table = [];
      var d=new Date();
      var year=d.getFullYear();
      var month:any =d.getMonth()+1;
      var day:any =d.getDate();
      var sum_interest_paid;
      var sum_payment_paid;
        for(let i=0; i < this.lt; i++){
          /*Date Logic */
          var curdate = new Date(year, month, day)
          var d=curdate;
          var year=d.getFullYear();
          var month:any =d.getMonth()+1;
          var day:any =d.getDate(); 
          if (month<10){
            month = "0"+month;
            };
            if (day<10){
              day = "0"+day;
              };
              var inc_date = day + "-" + month + "-" + year;
           /*Date Logic */

           var ending_balance;
          
              if(i==1)
              {
                var frq = 12;
                var Loan_amount = this.loan_amount;
                var N = this.loan_term_years * frq;
                var I = (this.apr / 100) / frq;
               
                var v = Math.pow((1 + I), N);
                var t = (I * v) / (v - 1);
                var result = Loan_amount * t;
                var interest_payment = 1 * I;
                var flat_rate_interest_payment:any =  String((Loan_amount * interest_payment).toFixed(2));
                var principle_paid =  result - flat_rate_interest_payment;
                ending_balance = Loan_amount - principle_paid;
                sum_interest_paid = parseFloat(flat_rate_interest_payment);
                sum_payment_paid = principle_paid.toFixed(2);
                this.interest_table.push(
                {
                  inc_date:inc_date,
                  loan_amount: this.currencyPipe.transform(
                    Loan_amount,
                    "₹"
                  ),
                  schedule_payment:this.currencyPipe.transform(
                    result,
                    "₹"
                  ),
                  interest_paid:this.currencyPipe.transform(
                    flat_rate_interest_payment,
                    "₹"
                  ),
                  principle_paid:this.currencyPipe.transform(
                    principle_paid,
                    "₹"
                  ) ,
                  ending_balance : this.currencyPipe.transform(
                    ending_balance,
                    "₹"
                  ),
                });                   
              }
              if(i>=1)
              {
                var frq = 12;
                var Loan_amount = ending_balance;
                var N = this.loan_term_years * frq;
                var I = (this.apr / 100) / frq;
               
                var v = Math.pow((1 + I), N);
                var t = (I * v) / (v - 1);
                var result = this.loan_amount * t;
                var interest_payment = 1 * I;
                var flat_rate_interest_payment:any =  String((Loan_amount * interest_payment).toFixed(2));
                var principle_paid =  result - flat_rate_interest_payment;
                ending_balance = Loan_amount - principle_paid;
                sum_interest_paid = sum_interest_paid +  parseFloat(flat_rate_interest_payment);
                sum_payment_paid = parseFloat(sum_payment_paid) + parseFloat(principle_paid.toFixed(2));
                this.interest_table.push(
                  {
                    inc_date:inc_date,
                    loan_amount: this.currencyPipe.transform(
                      Loan_amount,
                      "₹"
                    ),
                    schedule_payment:this.currencyPipe.transform(
                      result,
                      "₹"
                    ),
                    interest_paid:this.currencyPipe.transform(
                      flat_rate_interest_payment,
                      "₹"
                    ) ,
                    principle_paid:this.currencyPipe.transform(
                      principle_paid,
                      "₹"
                    ) ,
                    ending_balance : this.currencyPipe.transform(
                      ending_balance,
                      "₹"
                    ),
                  });   
              }
              
             
          }
          this.total_interest_paid = sum_interest_paid.toFixed(2);
       this.sum_pay_paid =  (parseFloat(sum_payment_paid) + parseFloat(sum_interest_paid)).toFixed(2);
       this.sum_pay_percentage =  ((this.total_interest_paid / this.loan_amount) * 100).toFixed(2)+"%";
  }

  get_loan_term(Event):void
  {
   
    this.lt = this.loan_term_years * 12;
    this.pmt_cal();
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
    //alert(this.loan_term_years+"---"+this.apr+"---"+this.lt+"---"+this.loan_amount)
    //console.log(this.lt)
      var frq = 12;
      var N = this.loan_term_years * frq;
			var I = (this.apr / 100) / frq;
     
			var v = Math.pow((1 + I), N);
			var t = (I * v) / (v - 1);
			var result = this.loan_amount * t;
      
      var interest_payment = 1 * I;

      var principle_payment = this.loan_amount / this.lt;
   
      this.scheduled_payment =  String(result.toFixed(2));
      this.interest_per_period = String(interest_payment)
      this.flat_rate_principle_payment =  String(principle_payment.toFixed(2));
      this.flat_rate_interest_payment =  String((this.loan_amount * interest_payment).toFixed(2));
       var total_payment:any =  (principle_payment + (this.loan_amount * interest_payment)).toFixed(2);
      this.flat_rate_total_payment =  total_payment;
      this.flat_rate_final_total_payment = (total_payment * this.lt).toFixed(2);
      this.flat_rate_final_interest_payment = String((this.flat_rate_final_total_payment - this.loan_amount).toFixed(2));
      this.flat_rate_final_interest_payment_pre = String((this.flat_rate_final_interest_payment / this.loan_amount * 100 ).toFixed(2)) +"%";
      //alert(result.toFixed(2))

      this.getEmiTable();
  }
  submitData():void{
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
      const branch_id = this.param.snapshot.paramMap.get('branch_id');
      const area_id = this.param.snapshot.paramMap.get('area_id');
      const center_id = this.param.snapshot.paramMap.get('center_id');
      const group_id = this.param.snapshot.paramMap.get('group_id');
      var param = {branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id,
      total_loan_amount:this.total_loan_amount_number,loan_members:this.GroupData.member_limit,
      loan_amount_per_member:this.loan_amount,anual_percentage_rate:this.apr,term_year:this.loan_term_years,loan_date:this.date,
      payment_type:this.payment_type_period,payment_frequency:this.payFrq,cmpound_frequency:this.intFrq,
      flat_principle_payment:this.flat_rate_principle_payment,
      flat_interest_payment:this.flat_rate_interest_payment,
      flat_monthly_payment:this.flat_rate_total_payment,
      flat_total_payment:this.flat_rate_final_total_payment,
      flat_total_interest_paid:this.flat_rate_final_interest_payment,
      flat_total_interest_paid_per:this.flat_rate_final_interest_payment_pre,
      scheduled_payment:this.scheduled_payment,
      scheduled_no_of_payment:this.lt,
      interest_rate_per_period:this.interest_per_period,
      reducing_total_payment:this.sum_pay_paid,
      reducing_interest_paid:this.total_interest_paid,
      reducing_interest_paid_precentage:this.sum_pay_percentage,
      loan_data_emi:this.interest_table,
      members_id:this.members_ids
    };

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
  else
  {
    alert()
  }
  }

  viewForm(data): void
  {

    this.router.navigate(['/loans/LoanForm/' + data.loan_application_no]);
  }
}
