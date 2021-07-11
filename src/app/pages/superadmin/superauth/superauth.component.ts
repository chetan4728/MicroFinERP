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
  selector: 'app-superauth',
  templateUrl: './superauth.component.html',
  styleUrls: ['./superauth.component.scss']
})
export class SuperauthComponent implements OnInit {

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
 constructor(public local: LocalStorageService, private formBuilder: FormBuilder, private router: Router, private api: AuthService,
             private dp: DropDownsService ) {
             }
 ngOnInit(): void {
   this.initForm();
   this.UserNameIcon = 'fas fa-envelope';
   this.UserPassIcon = 'fas fa-lock';
   this.AppUrl = environment.api;
   this.AppKey = Math.floor(Math.random() * 899999 + 100000);
   this.api._check_new_setup().subscribe(data => {
   if (data.error === true)
   {
     this.ShowLogin = 'show';
     this.ShowRegistration = 'hide';
     this.BankDetails = data;
   }
   else
   {
     this.ShowLogin = 'false';
     this.ShowRegistration = 'show';
   }
   });
 }

 initForm(): void {
   this.LoginForm = this.formBuilder.group({
     employee_login_code: ['', Validators.required],
     password: ['', Validators.required],
   });
 }

 
 login(): void{

   const data = {
     employee_login_password: this.LoginForm.get('password').value,
     employee_login_code: this.LoginForm.get('employee_login_code').value,
     employee_device: "website",
 };
   this.api._loginSperSession(data).subscribe(res => {

          // console.log("employee_data",res);
     if (res.error === true)
     {
      /// console.log("employee_data",res);
       const session = {
         employee_id: res.sp_id,
         token: res.token,
         employee_first_name: res.f_name,
         employee_last_name: res.l_name,
         employee_role_id: 0,
         profile: res.profile,
         role_code: 0,
         employee_branch_id: 0,
         branch_name: null,
         bank_name: "",
         bank_app_key_code: 0,
        };
         this.local.set(environment.userSession, session, environment.SessionTime, 's');
        window.location.href = 'superdashboard/';
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
     this.api._checsuperkUser({employee_login_code: this.LoginForm.get('employee_login_code').value}).subscribe(res => {
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
     this.api._checkSuperPassword(data).subscribe(res => {
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


}
