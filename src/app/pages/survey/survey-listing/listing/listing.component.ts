import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  add():void{
    this.router.navigate(['/survey/assign-survey']);
  }

}
