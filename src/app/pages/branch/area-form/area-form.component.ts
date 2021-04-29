import { Area } from './../../../model/area';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { BranchService } from 'src/app/services/branch.service';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreaService } from 'src/app/services/area.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment.prod';
declare var $: any;
@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Branch> =  new Subject();
   selectRoleRow: Area = {area_id : 0,area_name :null,branch_id : 0,status:0,branch_name:null};
   BranchList: Branch[];
   AreaList: Area[];
   Form: FormGroup;
   id :any;
   session:any
   constructor(public local: LocalStorageService,private formBuilder: FormBuilder,private api: AreaService, private branch: BranchService,private param: ActivatedRoute ,) { 
    this.id =  this.param.snapshot.paramMap.get('id');
    this.selectRoleRow.branch_id =  this.id;
   }

  ngOnInit(): void {
    this.session = this.local.get(environment.userSession);
    this.LoadBranch();
    this.initForm();
    this.LoadTableData();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }
  initForm(): void {
    this.Form = this.formBuilder.group({
      branch_id: ['', Validators.required],
      area_name: ['', Validators.required],
     status: ['', Validators.required],
    });
  }
  LoadTableData(): void {
    this.api._get_area({branch_id:this.id}).subscribe((areas: Area[]) => {

      this.AreaList = areas;
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
  editRecord(area: Area): void{
    this.selectRoleRow = area;
    $('#myModal').modal('show');
  }

  showModal(): void {
    this.selectRoleRow = {area_id : 0,area_name :null,branch_id : 0,status:0,branch_name:null};
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
        this.api._delete_area(row).subscribe(data =>
          {
             this.LoadTableData();
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
  submit(): void {
    if (this.selectRoleRow.area_id > 0)
    {
      this.api._update_area(this.selectRoleRow).subscribe(data =>
        {
          this.LoadTableData();
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
    this.api._add_area(this.Form.value).subscribe(data =>
      {
        this.LoadTableData();
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
  
  LoadBranch(): void{

    this.branch._get_branch({bank_id:this.session.bank_id,token:this.session.token}).subscribe((branches: Branch[]) => {
      this.BranchList = branches;
  });
  }
}
