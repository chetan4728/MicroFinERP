import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { CustomerService } from 'src/app/services/customer.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(public local: LocalStorageService, public api:CustomerService, public route:Router, public router:Router) { }
  _local: any;
  _data:any;
   _customer_saving_no:any;
  ngOnInit(): void {
    this._local = this.local.get(environment.userSession);
  }
  fnSearch()
  {
   
    
   let params = {
    bank_id:this._local.bank_id,
    saving_account_number:this._customer_saving_no
   }
   this.api._get_customer_data(params).subscribe((response)=>{
    if(Object.keys(response).length > 0 ){
      this._data = response;

      this.router.navigate(['customer/customer-details'], { 
        state: { data: this._data  } 
      });
    }else{
      alert("No Custmer Data Found")
    }
    
   // alert(JSON.stringify(this._data))
   })
 
 
  }

}
