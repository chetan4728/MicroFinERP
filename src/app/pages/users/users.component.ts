import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Branch } from './../../model/branch';
import { Component, OnInit  , ViewChild} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DropDownsService } from 'src/app/services/DropDowns.service';

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
  add(): void
  {
    this.router.navigate(['/users/UserAdd']);
  }
}
