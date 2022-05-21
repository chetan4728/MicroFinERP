import { NavigationExtras, Router } from '@angular/router';
import { Branch } from './../../model/branch';
import { Component, OnInit  , ViewChild} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BranchService } from 'src/app/services/branch.service';
import { DropDownsService } from 'src/app/services/DropDowns.service';
import { LocalStorageService} from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
import { AreaService } from 'src/app/services/area.service';
declare var $: any;
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Branch> =  new Subject();
  Form: FormGroup;
  StateList: [];
  AreaList:any;
  DistrictList: [];
  BranchList: Branch[];
  session:any
  selectRoleRow: Branch = {area_name:"",address: null , branch_id : 0,bank_id:0, area_id : null,
  branch_name : null, branch_status : "", contact_no: null , district_id: null , phone_no: null, post_code: null, state_id: null};
  constructor(public apiarea :AreaService, public local: LocalStorageService,private router: Router,private formBuilder: FormBuilder, private dp: DropDownsService, private api: BranchService) { }

  ngOnInit(): void {
    this.session = this.local.get(environment.userSession);
    this.initForm();
    this.LoadAreaData();
    this.dp._getStats().subscribe(data => {
      this.StateList = data;
      // console.log(this.StateList);
    });
    this.LoadTable();
  }
  LoadTable(): void{
   

    this.api._get_branch({bank_id:this.session.bank_id,token:this.session.token}).subscribe((branches: Branch[]) => {

      // console.log(branches)
      this.BranchList = branches;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
  });
  }
  initForm(): void {
    this.Form = this.formBuilder.group({
      branch_name: ['', Validators.required],
      state_id: ['', Validators.required],
      area_id: ['', Validators.required],
      district_id: ['', Validators.required],
      post_code: ['', [Validators.required, Validators.pattern(new RegExp('[0-9 ]{6}'))]],
      address: [''],
      phone_no: ['', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern(new RegExp('[0-9 ]{10}'))]],
      branch_status: ['', Validators.required],
      bank_id: this.session.bank_id
    });
  }


  LoadAreaData(): void {
    this.apiarea._get_area({bank_id:this.session.bank_id,token:this.session.token}).subscribe((data) => {

      this.AreaList = data;
      
  });
  }
  showModal(): void {
    this.selectRoleRow = {area_name:"",address: null , branch_id : 0,bank_id:0, area_id : null,
      branch_name : null, branch_status : "", contact_no: null , district_id: null , phone_no: null, post_code: null, state_id: null};
    $('#myModal').modal('show');

  }
  submit(): void {
    if (this.selectRoleRow.branch_id > 0)
    {


      this.api._update_branch(this.selectRoleRow).subscribe(data =>
        {
           this.LoadTable();
           document.getElementById('close-modal').click();
           this.Form.reset();
           Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Data Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
    else
    {
    this.api._add_branch(this.Form.value).subscribe(data =>
      {
         this.LoadTable();
         document.getElementById('close-modal').click();
         this.Form.reset();
         Swal.fire({
          position: 'top-end',
          toast: true,
          icon: 'success',
          title: 'Data Inserted Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }

  onChangeState(stateId: number): void {
  this.dp.getDistricts({id: stateId}).subscribe(data => {
    this.DistrictList = data;
  });
  }
  sendModal(): void {
    this.hideModal();

  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }
  editRecord(branch: Branch): void{
    this.selectRoleRow = branch;
    this.onChangeState(branch.state_id);
    $('#myModal').modal('show');
  }
  deleteRecord(row): void{
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.api._delete_branch(row).subscribe(data =>
          {
             this.LoadTable();
             Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        );
      }
    });
  }

  area(data: Branch): void
  {

    this.router.navigate(['/branch/Area/' + data.branch_id]);
  }

}
