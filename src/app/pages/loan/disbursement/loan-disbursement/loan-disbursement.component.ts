import { Component, OnInit } from '@angular/core';
import { LoanDisbursementService } from '../../../../services/loan.disbursement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-loan-disbursement',
  templateUrl: './loan-disbursement.component.html',
  styleUrls: ['./loan-disbursement.component.scss']
})
export class LoanDisbursementComponent implements OnInit {

  row:any;
  members:any;
  Url:any;
  constructor( private param: ActivatedRoute ,private api: LoanDisbursementService,) { }

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
  }

}
