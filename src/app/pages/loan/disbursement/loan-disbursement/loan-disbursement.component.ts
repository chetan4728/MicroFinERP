import { Component, OnInit } from '@angular/core';
import { LoanDisbursementService } from '../../../../services/loan.disbursement.service';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { CurrencyPipe } from "@angular/common";
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
  row:any;
  members:any;
  Url:any;
  formattedAmount;
  payFrq:any = "Weekly";
  intFrq:any= "Weekly";
  amount;
  apr:any=1;
  lt;
  loan_term_years=1;
  loan_amount;
  scheduled_payment:any=0;
  flat_rate_principle_payment:any;
  flat_rate_interest_payment:any;
  flat_rate_total_payment:any;
  flat_rate_final_total_payment:any;
  flat_rate_final_interest_payment:any;
  flat_rate_final_interest_payment_pre:any;

  constructor(private currencyPipe: CurrencyPipe, private param: ActivatedRoute ,private api: LoanDisbursementService,) { }

  ngOnInit(): void {

    const branch_id = this.param.snapshot.paramMap.get('branch_id');
    const area_id = this.param.snapshot.paramMap.get('area_id');
    const center_id = this.param.snapshot.paramMap.get('center_id');
    const group_id = this.param.snapshot.paramMap.get('group_id');
    this.Url = environment.uploads;
    this.api._get_group_details({branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      console.log(data);
      
      this.row = data;
      
     });


     this.api._get_group_members({branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      console.log(data);
      
      this.members = data;
      
     });

     this.lt = this.loan_term_years * 12;
  }
  transformAmount(element) {
 //   alert(this.formattedAmount)
    this.loan_amount = this.formattedAmount;
    this.formattedAmount = this.currencyPipe.transform(
      this.formattedAmount,
      "₹"
    );

    element.target.value = this.formattedAmount;
  }

  payFeqFun(Event):void
  {
    this.payFrq = Event;
       
  }

  intFrqFun(Event):void
  {
    
  }

  get_loan_term(Event):void
  {
   
    this.lt = this.loan_term_years * 12;
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
    var N = this.loan_term_years * this.lt;
			var I = (this.apr / 100) / this.lt;
			var v = Math.pow((1 + I), N);
			var t = (I * v) / (v - 1);
			var result = this.loan_amount * t;
      var principle_payment = this.loan_amount / this.lt;
      var interest_payment = principle_payment * (this.apr / 100);
      
      var total_payment =  principle_payment + interest_payment;
      this.scheduled_payment =  String(result.toFixed(2));
      this.flat_rate_principle_payment =  String(principle_payment.toFixed(2));
      this.flat_rate_total_payment =  String(total_payment.toFixed(2));
      this.flat_rate_interest_payment =  String(interest_payment.toFixed(2));
      this.flat_rate_final_total_payment = String(total_payment * this.lt);
      this.flat_rate_final_interest_payment = String(this.flat_rate_final_total_payment - this.loan_amount );
      this.flat_rate_final_interest_payment_pre = String(this.flat_rate_final_interest_payment / this.loan_amount * 100 ) +"%";
      //alert(result.toFixed(2))
  }
}
