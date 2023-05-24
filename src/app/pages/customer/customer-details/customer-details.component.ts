import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})

export class CustomerDetailsComponent implements OnInit {
  data:any;
  url:any;
  selectRoleRow:any;
  constructor(private  route:ActivatedRoute) { }

  ngOnInit(): void {

    this.data =  window.history.state.data[0];
    this.selectRoleRow = this.data;
    this.url = environment.uploads;
    console.log(this.data);
  
  }

}
