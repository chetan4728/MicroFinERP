import { environment } from 'src/environments/environment.prod';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router  } from '@angular/router';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService} from 'angular-web-storage';
import { DropDownsService } from 'src/app/services/DropDowns.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {
   rolesList: Role[];
   UserNameIcon: any;
   UserPassIcon: any;
   BankDetails: any;
   StateList: [];
   DistrictList: [];
   url: any;
   AppUrl: any;
   LoginForm: FormGroup;
   SetupForm: FormGroup;
   AppKey: any;
   ShowRegistration: any;
   ShowLogin: any;
   bank_name_title:any;
  constructor(public local: LocalStorageService, private formBuilder: FormBuilder, private router: Router, private api: AuthService,
              private dp: DropDownsService ) {
              }
  ngOnInit(): void {
    this.initForm();
    this.LoadRoles();
    this.initState();
    this.initSetupForm();
    this.UserNameIcon = 'fas fa-envelope';
    this.UserPassIcon = 'fas fa-lock';
    this.AppUrl = environment.api;
    this.AppKey = Math.floor(Math.random() * 899999 + 100000);
    this.api._check_new_setup().subscribe(data => {
    if (data.error === true)
    {
      this.ShowLogin = 'show';
      this.ShowRegistration = 'hide';
      this.BankDetails = data.row;
      this.bank_name_title =  this.BankDetails.bank_name;
      //console.log(this.BankDetails)
    }
    else
    {
      this.ShowLogin = 'false';
      this.ShowRegistration = 'show';
    }
    });
  }

  LoadRoles(): void{

    this.api._getRole().subscribe((roles: Role[]) => {

      this.rolesList = roles;
  });
  }
  initForm(): void {
    this.LoginForm = this.formBuilder.group({
      employee_login_code: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  initSetupForm(): void {
    this.SetupForm = this.formBuilder.group({
      bank_name: ['', Validators.required],
      bank_email: ['', [Validators.required, Validators.email]],
      bank_state: ['', Validators.required],
      bank_contact_no: ['', Validators.required],
      bank_district: ['', Validators.required],
      bank_area_code: ['', Validators.required],
      bank_app_url: ['', Validators.required],
      bank_app_key_code: ['', Validators.required],
      bank_registration_no: [null],
      bank_tag_line: [null],
      bank_address: [null],
    });
  }
  initState(): void
  {
    this.dp._getStats().subscribe(data => {
      this.StateList = data;
    });
  }

  onChangeState(stateId: number): void {
    this.dp.getDistricts({id: stateId}).subscribe(data => {
      this.DistrictList = data;
    });
    }
  login(): void{

    const data = {
      employee_login_password: this.LoginForm.get('password').value,
      employee_login_code: this.LoginForm.get('employee_login_code').value,
      employee_role_id: this.LoginForm.get('role').value,
      employee_device: "website",
  };
    this.api._loginSession(data).subscribe(res => {
      if (res.error === true)
      {
        console.log("employee_data",res);
        const session = {
          employee_id: res.employee_id,
          token: res.token,
          bank_id: res.bank_id,
          employee_first_name: res.employee_first_name,
          employee_last_name: res.employee_last_name,
          employee_role_id: res.employee_role_id,
          profile: res.profile,
          role_code: res.role_code,
          employee_branch_id: res.branch_id,
          branch_name: res.branch_name,
          bank_name: res.bank_name,
          bank_app_key_code: res.bank_app_key_code,
          bank_intrest_type: res.bank_intrest_type,
         };
        this.local.set(environment.userSession, session, environment.SessionTime, 's');
         window.location.href = 'dashboard/';
      }
      else
      {
        this.LoginForm.controls.role.setErrors({ wrongRole: true });
      }
    });
}

checkUsername(): void
{
  if (this.LoginForm.get('employee_login_code').value !== '')
  {
      this.api._checkUser({employee_login_code: this.LoginForm.get('employee_login_code').value}).subscribe(res => {
        if (res.error === true)
        {
          this.UserNameIcon = 'fas fa-check right';
        }
        else
        {
          this.UserNameIcon = 'fas fa-times-circle wrong';
          this.LoginForm.controls.employee_login_code.setErrors({ alreadyExist: true });
        }
      });
  }
  else
  {
    this.UserNameIcon = 'fas fa-times-circle wrong';
  }
}

checkPassword(): void
{
  if (this.LoginForm.get('password').value !== '')
  {
      const data = {
        employee_login_password: this.LoginForm.get('password').value,
        employee_login_code: this.LoginForm.get('employee_login_code').value,
    };
      this.api._checkPassword(data).subscribe(res => {
        if (res.error === true)
        {
          this.UserPassIcon = 'fas fa-check right';
        }
        else
        {
          this.UserPassIcon = 'fas fa-times-circle wrong';
          this.LoginForm.controls.password.setErrors({ wrongPass: true });
        }
      });
  }
  else
  {
    this.UserPassIcon = 'fas fa-times-circle wrong';
  }
}
create(): void
{
  this.api._create_new_setup(this.SetupForm.value).subscribe(data => {
   console.log(data);
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
    this.SetupForm.patchValue({
      profile: file
    });
    this.SetupForm.get('profile').updateValueAndValidity();
  }
}

}
