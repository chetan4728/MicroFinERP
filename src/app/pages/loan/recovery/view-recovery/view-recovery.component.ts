import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { EmiService } from 'src/app/services/emi.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-recovery',
  templateUrl: './view-recovery.component.html',
  styleUrls: ['./view-recovery.component.scss']
})
export class ViewRecoveryComponent implements OnInit {
  GroupData:any;
  MemberList:any;
  SessionData: any;
  isApproved: boolean = false;
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
          emi.principle_paid = emi.principle_paid;
          emi.interest_paid =  emi.scheduled_payment - emi.principle_paid;
          emi.begining_bal = emi.begining_bal;
          emi.ending_balance = emi.ending_balance;       
        });
        
      });
      
     });
  }
  getItems(data) {
    //console.log(data)
    return data.filter((item) => item.status != "0");
  }
  updateStatus(row){
   // console.log("row", row);
    this.api.update_approved_status({laon_application_no:row.laon_application_no,disbursment_number: row.disbursment_number, emi_no: row.emi_no, status:row.status}).subscribe(data=>{
      this.getGroupData();
      this.getGroupMembers();
    });
  }

  roundToNearest(numToRound, numToRoundTo) {
    return Math.round(numToRound / numToRoundTo) * numToRoundTo;
  }

}

