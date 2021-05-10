import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './superdashboard.component.html',
  styleUrls: ['./superdashboard.component.scss']
})
export class SuperDashboardComponent implements OnInit {

  Form: FormGroup;
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
