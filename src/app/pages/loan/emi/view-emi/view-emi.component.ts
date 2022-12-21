import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { EmiService } from 'src/app/services/emi.service';
import { environment } from 'src/environments/environment.prod';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-emi',
  templateUrl: './view-emi.component.html',
  styleUrls: ['./view-emi.component.scss']
})
export class ViewEmiComponent implements OnInit {
  GroupData:any;
  MemberList:any;
  SessionData: any;
  constructor(public local: LocalStorageService, private router: Router,private param: ActivatedRoute,private api: EmiService,) { }

  ngOnInit(): void {
    this.SessionData = this.local.get(environment.userSession);
    this.getGroupData();
    this.getGroupMembers();
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
          emi.principle_paid = emi.principle_paid.toFixed(2);
          emi.interest_paid =  emi.scheduled_payment.toFixed(2) - emi.principle_paid;
          emi.begining_bal = emi.begining_bal.toFixed(2);
          emi.ending_balance = emi.ending_balance.toFixed(2);       
        });
        
      });
      
     });
  }

  roundToNearest(numToRound, numToRoundTo) {
    return Math.round(numToRound / numToRoundTo) * numToRoundTo;
  }

}
