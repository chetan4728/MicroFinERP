import { NavigationExtras, Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Branch } from './../../model/branch';
import { Component, OnInit  , ViewChild} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DropDownsService } from 'src/app/services/DropDowns.service';
import Swal from 'sweetalert2';
import { Users } from 'src/app/model/users';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Branch> =  new Subject();
  StateList: [];
  DistrictList: [];
  UserList: Users[];


  constructor(private router: Router, private dp: DropDownsService, private api: UsersService) { }

  ngOnInit(): void {
    this.LoadTable();
  }
  LoadTable(): void{

    this.api._get_branch().subscribe((users: Users[]) => {

      this.UserList = users;
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
  edit(data: Users): void
  {

    this.router.navigate(['/users/UserEdit/' + data.employee_id]);
  }
  add(): void
  {
    this.router.navigate(['/users/UserAdd/']);
  }
  delete_record(row): void
  {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.api._delete_branch({employee_id: row.employee_id}).subscribe(data =>
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
