import { BankService } from './../../services/bank.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropDownsService } from 'src/app/services/DropDowns.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  StateList: [];
  DistrictList: [];

  Form: FormGroup;
  url:any;
  selectRoleRow:any;
  bank_intrest:any;
  dataset:any;
  session:any;
  constructor(public local: LocalStorageService,private param: ActivatedRoute , private route: Router ,private api:BankService, private formBuilder: FormBuilder,private dp: DropDownsService ) { }

  ngOnInit(): void {
    this.session = this.local.get(environment.userSession);
    this.initState();
    this.initForm();
    this.int_bank_intrest();

    const id = this.session.bank_id;
    
    if (id != null)
    {
      
      this.api._get({bank_id: id}).subscribe((data) => {
          this.selectRoleRow = data;
          this.url = this.selectRoleRow.bank_logo;
          console.log(this.selectRoleRow);
          this.dp.getDistricts({id: this.selectRoleRow.bank_state}).subscribe(data => {
            this.DistrictList = data;
          });
          this.Form.setValue({
            bank_name: this.selectRoleRow.bank_name,
            bank_url: this.selectRoleRow.bank_url,
            bank_state: this.selectRoleRow.bank_state,
            bank_district:  this.selectRoleRow.bank_district,
            bank_address: this.selectRoleRow.bank_address,
            bank_app_key_code: this.selectRoleRow.bank_app_key_code,
            bank_contact_no: this.selectRoleRow.bank_contact_no,
            bank_email: this.selectRoleRow.bank_email,
            bank_status:this.selectRoleRow.bank_status,
            bank_logo: this.selectRoleRow.bank_logo,
            user_email: this.selectRoleRow.employee_email_id,
            user_contact: this.selectRoleRow.employee_contact_no,
            fname:this.selectRoleRow.employee_first_name,
            lname: this.selectRoleRow.employee_last_name,
            username: this.selectRoleRow.employee_login_code,
            password: this.selectRoleRow.employee_login_password,
            bank_intrest_type:this.selectRoleRow.bank_intrest_type,
            activation_date: this.selectRoleRow.added_date,
              });
        
      });
    }
   
  }

  submit():void{

    const id = this.session.bank_id;
    if (id != null)
    {
  
          const formData: any = new FormData();
          
          formData.append('bank_url', this.Form.get('bank_url').value);
          formData.append('bank_name', this.Form.get('bank_name').value);
          formData.append('bank_state', this.Form.get('bank_state').value);
          formData.append('bank_district', this.Form.get('bank_district').value);
          formData.append('bank_address', this.Form.get('bank_address').value);
          formData.append('bank_app_key_code', this.Form.get('bank_app_key_code').value);
          formData.append('bank_contact_no', this.Form.get('bank_contact_no').value);
          formData.append('bank_email', this.Form.get('bank_email').value);
          formData.append('bank_status', this.Form.get('bank_status').value);
          formData.append('bank_logo', this.Form.get('bank_logo').value);
          formData.append('bank_id', id);
          formData.append('user_id', this.Form.get('user_email').value);
          formData.append('user_contact', this.Form.get('user_contact').value);
          formData.append('user_email', this.Form.get('user_email').value);
          formData.append('fname', this.Form.get('fname').value);
          formData.append('lname', this.Form.get('lname').value);
          formData.append('username', this.Form.get('username').value);
          formData.append('password', this.Form.get('password').value);
          formData.append('bank_intrest_type', this.Form.get('bank_intrest_type').value);
          formData.append('activation_date', this.Form.get('activation_date').value);
        

          //console.log(formData);
          this.api._update(formData).subscribe(data => {
          this.dataset = data;
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Bank Details Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.route.navigateByUrl('/bank-details');
        });
    }
  
  }
  initState(): void
  {
    this.dp._getStats().subscribe(data => {
      this.StateList = data;
     // console.log(this.StateList);
    });
  }

  int_bank_intrest(): void
  {
    this.api._get_bank_intrest().subscribe(data => {
      this.bank_intrest = data;
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
      bank_app_key_code: ['', Validators.required],
      bank_contact_no: ['', [Validators.required, Validators.pattern(new RegExp('[0-9 ]{10}'))]],
      bank_email: ['', [Validators.required , Validators.email]],
      bank_status: ['', Validators.required],
      bank_logo: [null],
      user_email: ['', [Validators.required , Validators.email]],
      user_contact: ['', [Validators.required, Validators.pattern(new RegExp('[0-9 ]{10}'))]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', [Validators.required,Validators.minLength(8)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      bank_intrest_type: ['', Validators.required],
      activation_date: [''],
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
