import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from 'src/app/model/users';
import { DropDownsService } from 'src/app/services/DropDowns.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  Form: FormGroup;
  StateList: [];
  DistrictList: [];
  selectRoleRow: Users = { employee_id: null , employee_branch_id : 0, employee_address : null,
    employee_adhar_card_no : null, employee_alt_contact_no : null, employee_bank_id: null ,
    employee_center_id: null , employee_contact_no: null, employee_district_id: null, employee_dob: null, employee_email_id: null,
    employee_first_name: null , employee_gender: null , employee_last_name: null, employee_login_code: null,
    employee_login_password: null, employee_middle_name: null, employee_pan_card_no: null, employee_profile: null,
    employee_role_id: null, employee_state_id: null, employee_status: null};
  constructor(private formBuilder: FormBuilder, private dp: DropDownsService) { }

  ngOnInit(): void {
    this.initForm();
    this.dp._getStats().subscribe(data => {
      this.StateList = data;
      console.log(this.StateList);
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
      employee_email_id: ['', Validators.required ],
      employee_address: ['', Validators.required ],
      employee_login_code: ['', Validators.required],
      employee_login_password: ['', Validators.required],
      user_status: ['', Validators.required],
    });
  }
  onChangeState(stateId: number): void {
    this.dp.getDistricts({id: stateId}).subscribe(data => {
      this.DistrictList = data;
    });
    }
}
