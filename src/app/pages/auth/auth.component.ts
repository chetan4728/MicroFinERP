
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router  } from '@angular/router';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
   rolesList: Role[];
  LoginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private api: AuthService) { }
  ngOnInit(): void {
    this.initForm();
    this.LoadRoles();
  }

  LoadRoles(): void{

    this.api._getRole().subscribe((roles: Role[]) => {

      this.rolesList = roles;
  });
  }
  initForm(): void {
    this.LoginForm = this.formBuilder.group({
      empCode: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  login(): void{
    window.location.href = 'dashboard/';

}

}
