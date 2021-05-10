import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { BankService } from 'src/app/services/bank.service';
import { DropDownsService } from 'src/app/services/DropDowns.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-formbank',
  templateUrl: './formbank.component.html',
  styleUrls: ['./formbank.component.scss']
})
export class FormbankComponent implements OnInit {
  StateList: [];
  DistrictList: [];

  Form: FormGroup;
  url:any;
  selectRoleRow:any;
  dataset:any;
  constructor(private param: ActivatedRoute , private route: Router ,private api:BankService, private formBuilder: FormBuilder,private dp: DropDownsService ) { }

  ngOnInit(): void {
    this.initState();
    this.initForm();
  }

  submit():void{
    this.api._add_user(this.Form.value).subscribe(data => {
        this.dataset = data;
         console.log(this.dataset);
          this.api._upload_photo(this.Form, this.dataset.bank_id).subscribe(res => {
         });
        //this.Form.reset();
        this.route.navigateByUrl('/Activebanks');
       
     
    });
  }
  initState(): void
  {
    this.dp._getStats().subscribe(data => {
      this.StateList = data;
     // console.log(this.StateList);
    });
  }
  initForm(): void {
    this.Form = this.formBuilder.group({
      bank_url: ['', Validators.required],
      bank_name: ['', Validators.required],
      bank_state: ['', Validators.required],
      bank_district: ['', Validators.required],
      bank_address: [''],
      bank_area_code: ['', Validators.required],
      bank_contact_no: ['', [Validators.required, Validators.pattern(new RegExp('[0-9 ]{10}'))]],
      bank_email: ['', [Validators.required , Validators.email]],
      bank_status: ['', Validators.required],
      bank_logo: [null]
    });

  }
  onChangeState(stateId: number): void {
    this.dp.getDistricts({id: stateId}).subscribe(data => {
      this.DistrictList = data;
    });
    }


  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };

      const file = (event.target as HTMLInputElement).files[0];
      console.log(file);
      this.Form.patchValue({
        bank_logo: file
      });
      this.Form.get('bank_logo').updateValueAndValidity();
    }
  }

}
