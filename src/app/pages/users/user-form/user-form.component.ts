import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Users } from 'src/app/model/users';
import { DropDownsService } from 'src/app/services/DropDowns.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  Form: FormGroup;
  StateList: [];
  DistrictList: [];
  RoleList: [];
  BranchList: [];
  debouncer: any;
  UserCode: any;
  url: any;
  session:any;
  selectRoleRow: Users = { employee_id: 0 , employee_branch_id : '', employee_address : null,
    employee_adhar_card_no : null, employee_alt_contact_no : null, employee_bank_id: null ,
    employee_center_id: null , employee_contact_no: null, employee_district_id:  '', employee_dob: null, employee_email_id: null,
    employee_first_name: null , employee_gender: '' , employee_last_name: null, employee_login_code: null,
    employee_login_password: null, employee_middle_name: null, employee_pan_card_no: null, profile: null,
    employee_role_id:  '', employee_state_id:  '', employee_status:  '',bank_id:0,panel_access:0};
  constructor(public local: LocalStorageService,private param: ActivatedRoute , private route: Router , private formBuilder: FormBuilder, private dp: DropDownsService ,
              private auth: AuthService, private api: UsersService) { }

  ngOnInit(): void {
    this.session = this.local.get(environment.userSession);
    this.initForm();
    this.initRole();
    this.initState();
    this.initBranch();
    this.initUserDetails();
    this.UserCode = Math.floor(Math.random() * 899999 + 100000);
  }

  initUserDetails(): void{
    const id = this.param.snapshot.paramMap.get('id');
    if (id != null)
    {
      this.api._get_user_details({employee_id: id}).subscribe((data: Users) => {
          this.selectRoleRow = data;
          this.url = this.selectRoleRow.profile;
          this.dp.getDistricts({id: data.employee_state_id}).subscribe(stats => {
            this.DistrictList = stats;
          });
      });
    }
  }

  initBranch(): void
  {
    this.dp._get_branch({bank_id:this.session.bank_id}).subscribe(data => {
      this.BranchList = data;
     // console.log(this.StateList);
    });
  }
  initState(): void
  {
    this.dp._getStats().subscribe(data => {
      this.StateList = data;
     // console.log(this.StateList);
    });
  }
  initRole(): void
  {
    this.dp._getRole({bank_id:this.session.bank_id}).subscribe(data => {
      this.RoleList = data;

    });
  }
  initForm(): void {
    this.Form = this.formBuilder.group({
      employee_first_name: ['', Validators.required],
      employee_middle_name: ['', Validators.required],
      employee_last_name: ['', Validators.required],
      employee_state_id: ['', Validators.required],
      employee_district_id: ['', Validators.required],
      employee_gender: ['', Validators.required],
      employee_dob: ['', Validators.required],
      employee_pan_card_no: ['', Validators.required],
      employee_adhar_card_no: ['', Validators.required],
      employee_contact_no: ['', [Validators.required, Validators.pattern(new RegExp('[0-9 ]{10}'))]],
      employee_email_id: ['', [Validators.required , Validators.email]],
      employee_address: [''],
      employee_login_code: ['', [Validators.required, this.validateUsername()]],
      employee_login_password: ['', Validators.required],
      employee_branch_id: ['', Validators.required],
      employee_role_id: ['', Validators.required],
      employee_status: ['', Validators.required],
      panel_access: ['', Validators.required],
      profile: [null],
      bank_id:this.session.bank_id
    });

  }
  onChangeState(stateId: number): void {
    this.dp.getDistricts({id: stateId}).subscribe(data => {
      this.DistrictList = data;
    });
    }
    isEmptyInputValue(value: any): boolean {
      // we don't check for string here so it also works with arrays
      return value === null || value.length === 0;
    }


    private validateUsername(): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
        if (this.isEmptyInputValue(control.value) || this.selectRoleRow.employee_login_code === control.value) {
          return null;
        }
        else
        {
          clearTimeout(this.debouncer);
          this.debouncer = setTimeout(() => {
           this.auth._checkUser({employee_login_code: control.value}).subscribe((res) => {
            if (res.error === true)
            {
              control.setErrors({alreadyExist: true});
            }
            else
            {
              control.setErrors(null);
              return  {alreadyExist: null};
            }
          });
        }, 1000);
       }
      };
  }
submit(): void{
 // console.log(this.Form.value);
 
  if (this.selectRoleRow.employee_id > 0)
  {
    if(this.Form.invalid)
    {
      this.Form.markAllAsTouched();
      return;
    }
    this.selectRoleRow.bank_id = this.session.bank_id;
    this.api._update_branch(this.selectRoleRow).subscribe(data => {
    
        if(this.Form.get("profile").value!=null)
        {
          this.api._upload_photo(this.Form, this.selectRoleRow.employee_id).subscribe(res => {

          })
      }
        this.Form.reset();
        Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'User Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          });
        //this.route.navigateByUrl('/users');
     
    });
  }
  else
  {
    if(this.Form.invalid)
    {
      this.Form.markAllAsTouched();
      return;
    }
    this.api._add_user(this.Form.value).subscribe(data => {
      if (data.employee_id > 0)
      {
        if(this.Form.get("profile").value!=null)
        {
          this.api._upload_photo(this.Form, this.selectRoleRow.employee_id).subscribe(res => {

          })
      }

        this.Form.reset();
        Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'User Added Successfully',
            showConfirmButton: false,
            timer: 1500
          });
        this.route.navigateByUrl('/users');
     }
    });
  }
}

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };

      const file = (event.target as HTMLInputElement).files[0];
      // console.log(file);
      this.Form.patchValue({
        profile: file
      });
      this.Form.get('profile').updateValueAndValidity();
    }
  }
}
