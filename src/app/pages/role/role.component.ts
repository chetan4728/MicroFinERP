import { Component, OnInit  , ViewChild} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Role } from 'src/app/model/role';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { RoleService } from 'src/app/services/role.service';
declare var $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Role> =  new Subject();
  rolesList: Role[];
  selectRoleRow: Role = { role_id : null , role_name: null, role_code: null , status: 0};

  RoleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: RoleService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15
    };
    this.LoadDatatable();
    this.initForm();
  }
  initForm(): void {
    this.RoleForm = this.formBuilder.group({
      role_name: ['', Validators.required],
      role_code: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  editRecord(role: Role): void{
    this.selectRoleRow = role;
    $('#myModal').modal('show');
  }

  LoadDatatable(): void{

    this.api._getRole().subscribe((roles: Role[]) => {

      this.rolesList = roles;
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

  showModal(): void {
    $('#myModal').modal('show');
    this.selectRoleRow = { role_id : 0 , role_name: '', role_code: '' , status: 0};

  }
  sendModal(): void {
    this.hideModal();

  }
  hideModal(): void {
    document.getElementById('close-modal').click();
    this.selectRoleRow = { role_id : 0 , role_name: '', role_code: '' , status: 0};
  }

   ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  submit(): void
  {
   if (this.selectRoleRow.role_id > 0)
   {
    this.api._update_role(this.selectRoleRow).subscribe(data =>
      {
         this.LoadDatatable();
         document.getElementById('close-modal').click();
         this.RoleForm.reset();
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

    this.api._add_role(this.RoleForm.value).subscribe(data =>
      {
         this.LoadDatatable();
         document.getElementById('close-modal').click();
         this.RoleForm.reset();
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
        this.api._delete_role(row).subscribe(data =>
          {
             this.LoadDatatable();
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
