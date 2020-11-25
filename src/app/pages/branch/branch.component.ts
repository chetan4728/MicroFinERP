
import { Branch } from './../../model/branch';
import { Component, OnInit  , ViewChild} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BranchService } from 'src/app/services/branch.service';
import { DropDownsService } from 'src/app/services/DropDowns.service';
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
  DistrictList: [];
  BranchList: Branch[];
  selectRoleRow: Branch = {address: null , branch_id : 0, branch_code : null,
  branch_name : null, branch_status : 0, contact_no: null , district_id: null , phone_no: null, post_code: null, state_id: null};
  constructor(private formBuilder: FormBuilder, private dp: DropDownsService, private api: BranchService) { }

  ngOnInit(): void {
    this.initForm();
    this.dp._getStats().subscribe(data => {
      this.StateList = data;
      console.log(this.StateList);
    });
    this.LoadTable();
  }
  LoadTable(): void{

    this.api._get_branch().subscribe((branches: Branch[]) => {

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
      branch_code: ['', Validators.required],
      district_id: ['', Validators.required],
      post_code: ['', [Validators.required, Validators.pattern(new RegExp('[0-9 ]{6}'))]],
      address: [''],
      phone_no: ['', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern(new RegExp('[0-9 ]{10}'))]],
      branch_status: ['', Validators.required],
    });
  }

  showModal(): void {
    this.selectRoleRow = {address: null , branch_id : 0, branch_code : null,
      branch_name : null, branch_status : 0, contact_no: null , district_id: null , phone_no: null, post_code: null, state_id: null};
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

}
