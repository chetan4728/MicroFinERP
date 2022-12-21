import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { EmiService } from 'src/app/services/emi.service';
import { environment } from 'src/environments/environment.prod';
import {CurrencyPipe} from '@angular/common';
@Component({
  selector: 'app-view-preclose-report',
  templateUrl: './view-preclose-report.component.html',
  styleUrls: ['./view-preclose-report.component.scss']
})
export class ViewPrecloseReportComponent implements OnInit {
  GroupData:any;
  MemberList:any;
  SessionData: any;
  constructor(public currencyPipe:CurrencyPipe, public local: LocalStorageService, private router: Router,private param: ActivatedRoute,private api: EmiService,) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.getGroupData();
    this.getGroupMembers();
  }
  getPreclose(data,row)
  {
    let paid_emi = row.filter(item => item.status !="0")
   console.log(paid_emi)
  
    if(paid_emi.length > 0)
    {
    let td = <HTMLTableCellElement> data.target.closest('tr').childNodes.item(6); 
    let lableText = <HTMLTableCellElement> data.target.closest('tr').childNodes.item(8);
    
    console.log("This row ID is " + paid_emi);
    let daily_interest = parseInt(row[0].anual_percentage_rate) / 365
    let total_amount = Math.round(parseInt(row[0].total_loan_amount) * daily_interest);
;
    let last_paid = paid_emi[paid_emi.length - 1];

    var interestAmount =parseInt(last_paid.anual_percentage_rate) / 100 / 12;
    var EMIAmount = this.roundToNearest(parseInt(last_paid.total_loan_amount) * interestAmount * (Math.pow(1 + interestAmount, 24)) / ((Math.pow(1 + interestAmount, 24)) - 1),10);

    var principal =   parseInt(last_paid.total_loan_amount);
    var monthlyEMIAmount = EMIAmount.toFixed(0);
    var totalLoanAmount__ = +24 * +EMIAmount;
    var totalAmount__ = totalLoanAmount__.toFixed(0);
    var totalInterest__ = +totalAmount__ - +principal;
    var Tint = (+EMIAmount * +24) - +principal;
    alert(monthlyEMIAmount)


    let precloseDate = new Date(data.target.value);
    let last_paidEmi = new Date(last_paid.inc_date);
    console.log(data.target.value+" ----"+last_paid.inc_date)
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var diffDays = Math.abs((last_paidEmi.getTime() - precloseDate.getTime()) / (oneDay));
    let pre_close_amount = total_amount * diffDays;
    
    if(precloseDate > last_paidEmi) {
      lableText.innerHTML = this.currencyPipe.transform(pre_close_amount, 'INR'); ;
    }
    else
    {
      alert("Preclose date should be greater than EMI date")
    }

    }
    else
    {
      let td = <HTMLTableCellElement> data.target.closest('tr').childNodes.item(6); 
    let lableText = <HTMLTableCellElement> data.target.closest('tr').childNodes.item(8);
    
   // console.log("This row ID is " + td.innerHTML);
    let daily_interest = parseInt(row[0].anual_percentage_rate) / 365
    let total_amount = Math.round(parseInt(row[0].total_loan_amount) * daily_interest);
;
    let last_paid = row[0];
    
    let precloseDate = new Date(data.target.value);
    let last_paidEmi = new Date(last_paid.inc_date);
    //console.log(data.target.value+" ----"+last_paid.inc_date)
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var diffDays = Math.abs((last_paidEmi.getTime() - precloseDate.getTime()) / (oneDay));
    let pre_close_amount = total_amount * diffDays;
    if(precloseDate > last_paidEmi) {
      lableText.innerHTML = this.currencyPipe.transform(pre_close_amount, 'INR'); ;
    }
    else
    {
      alert("Preclose date should be greater than EMI date")
    }
    
      
    }
    
  }
   
  getId(value)
  {
    return new Date(value).getTime();

  }

  
  getGroupData():void
  {
    
    const branch_id = this.param.snapshot.paramMap.get('branch_id');
    const area_id = this.param.snapshot.paramMap.get('area_id');
    const center_id = this.param.snapshot.paramMap.get('center_id');
    const group_id = this.param.snapshot.paramMap.get('group_id');
    const action = this.param.snapshot.paramMap.get('action');
    const loan_distribution_id = this.param.snapshot.paramMap.get('distribution_id');
    this.api._get_group_details({branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      //console.log(data);
      this.GroupData = data;
      
     });
  }

  getGroupMembers():void
  {
    const branch_id = this.param.snapshot.paramMap.get('branch_id');
    const area_id = this.param.snapshot.paramMap.get('area_id');
    const center_id = this.param.snapshot.paramMap.get('center_id');
    const group_id = this.param.snapshot.paramMap.get('group_id');
    const action = this.param.snapshot.paramMap.get('action');
    const loan_distribution_id = this.param.snapshot.paramMap.get('distribution_id');
    this.api._get_group_members_emi({bank_id:this.SessionData.bank_id,branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      this.MemberList = data;
      // console.log(this.MemberList, "MemberList");

      this.MemberList.forEach(member => {
        // console.log("member", member);
        member.loan_emi.forEach(emi => {
          emi.principle_paid = this.roundToNearest(emi.principle_paid,10);
          emi.interest_paid =  emi.scheduled_payment - this.roundToNearest(emi.principle_paid,10);
          emi.begining_bal = this.roundToNearest(emi.begining_bal,10);
          emi.ending_balance = this.roundToNearest(emi.ending_balance,10);       
        });
        
      });
      
     });
  }

  updateStatus(row){
    // console.log("row", row);
  }

  roundToNearest(n, x = 10) {
   // return Math.round(numToRound / numToRoundTo) * numToRoundTo;
   let rem = n % x;
   if (rem < 3)
      return n - rem;
   else
      return n - rem + x;
  }

}

