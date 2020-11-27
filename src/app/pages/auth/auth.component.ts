import { environment } from 'src/environments/environment.prod';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router  } from '@angular/router';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {
   rolesList: Role[];
   UserNameIcon: any;
   UserPassIcon: any;
  LoginForm: FormGroup;
  constructor(public local: LocalStorageService, private formBuilder: FormBuilder, private router: Router, private api: AuthService) { }
  ngOnInit(): void {
    this.initForm();
    this.LoadRoles();
    this.UserNameIcon = 'fas fa-envelope';
    this.UserPassIcon = 'fas fa-lock';
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
  login(): void{

    const data = {
      employee_login_password: this.LoginForm.get('password').value,
      employee_login_code: this.LoginForm.get('employee_login_code').value,
      employee_role_id: this.LoginForm.get('role').value,
  };
    this.api._loginSession(data).subscribe(res => {
      if (res.error === true)
      {
        const session = {
          employee_id: res.employee_id,
          token: res.token,
          employee_first_name: res.employee_first_name,
          employee_last_name: res.employee_last_name,
          employee_role_id: res.employee_role_id,
          profile: res.profile,
         };
        this.local.set(environment.userSession, session, 1000, 's');
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

}
