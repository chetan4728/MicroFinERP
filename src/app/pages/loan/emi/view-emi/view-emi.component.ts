import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EmiService } from 'src/app/services/emi.service';

@Component({
  selector: 'app-view-emi',
  templateUrl: './view-emi.component.html',
  styleUrls: ['./view-emi.component.scss']
})
export class ViewEmiComponent implements OnInit {
  GroupData:any;
  MemberList:any;

  constructor( private router: Router,private param: ActivatedRoute,private api: EmiService,) { }

  ngOnInit(): void {
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
    this.api._get_group_members({branch_id:branch_id,area_id:area_id,center_id:center_id,group_id:group_id}).subscribe(data  => {
      //console.log(data);
      
      this.MemberList = data;
     

      
    
     });
  }

}
