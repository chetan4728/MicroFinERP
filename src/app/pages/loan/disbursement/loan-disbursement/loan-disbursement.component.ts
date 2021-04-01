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
  lt:any;
  loan_term_years=1;
  loan_amount;
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
  total_interest_paid:any;
  sum_pay_paid:any;
  sum_pay_percentage:any;
  constructor(private currencyPipe: CurrencyPipe, private param: ActivatedRoute ,private api: LoanDisbursementService,) { }

  ngOnInit(): void {
    this.getDate();
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
          this.total_interest_paid = sum_interest_paid;
       this.sum_pay_paid =  parseFloat(sum_payment_paid) + parseFloat(sum_interest_paid);
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
      this.flat_rate_final_interest_payment = String(this.flat_rate_final_total_payment - this.loan_amount );
      this.flat_rate_final_interest_payment_pre = String((this.flat_rate_final_interest_payment / this.loan_amount * 100 ).toFixed(2)) +"%";
      //alert(result.toFixed(2))

      this.getEmiTable();
  }
}
