import { Area } from '../../model/area';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  latitude: number;
  longitude: number;
  zoom:number;

  
  private geoCoder;
  isDtInitialized = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Branch> =  new Subject();
   selectRoleRow: Area = {latitude:0,longitude:0, area_id : 0,area_name :null,bank_id : 0,status:"",branch_name:null};
   BranchList: Branch[];
   AreaList: Area[];
   Form: FormGroup;
   id :any;
   session:any
   constructor(   public searchElementRef: ElementRef,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader,public local: LocalStorageService,private formBuilder: FormBuilder,private api: AreaService, private branch: BranchService,private param: ActivatedRoute ,) { 

  
   }

  ngOnInit(): void {
    this.session = this.local.get(environment.userSession);
 
    this.LoadBranch();
    this.initForm();
    this.LoadTableData();

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
     
  
  
  
        this.geoCoder = new google.maps.Geocoder;
  
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
  
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
  }
 
  hideModal(): void {
    document.getElementById('close-modal').click();
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.selectRoleRow.latitude = position.coords.latitude;
        this.selectRoleRow.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    //console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.selectRoleRow.latitude = $event.coords.lat;
    this.selectRoleRow.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
         // window.alert(results);
        } else {
          //window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  initForm(): void {

    this.Form = this.formBuilder.group({
      area_name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      status: ['', Validators.required],
      bank_id:this.session.bank_id
    });
  }
  LoadTableData(): void {
    this.api._get_area({bank_id:this.session.bank_id,token:this.session.token}).subscribe((areas: Area[]) => {

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
    //console.log(this.selectRoleRow)
    $('#myModal').modal('show');
  }

  showModal(): void {
    this.selectRoleRow = {latitude:0,longitude:0, area_id : 0,area_name :null,bank_id : this.session.bank_id,status:"",branch_name:null};
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
