import { SurveyService } from './../../services/survey.service';
import { Survey } from './../../model/survey';
import { DropDownsService } from 'src/app/services/DropDowns.service';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {  FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  Form: FormGroup;
  SessionData: any;
  latitude: number;
  longitude: number;
  employeeDp:any;
  zoom:number;
  private geoCoder;
  address: string;
  selectRoleRow: Survey = {  assign_area_id:0 , area_name:null, branch_id:0 , latitude:null, longitude:null ,user_id:0};
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor( private route: Router , private formBuilder: FormBuilder ,public local: LocalStorageService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private dp: DropDownsService ,private api: SurveyService) { }

  ngOnInit(): void {
    this.initForm();
    this.SessionData = this.local.get(environment.userSession);
    this.selectRoleRow.branch_id = this.SessionData.employee_branch_id;
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
    this.getEmployee();
  }

  initForm(): void {
    this.Form = this.formBuilder.group({
      user_id: ['', Validators.required],
      area_name: ['', Validators.required],
      branch_id: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],

    });


  }
  getEmployee()
  {
 
    this.dp._get_branch_employee({branch_id:this.SessionData.employee_branch_id}).subscribe(data  => {
      //console.log(data);
      this.employeeDp = data;
  });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.selectRoleRow.latitude = position.coords.latitude;
        this.selectRoleRow.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
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
          this.address = results[0].formatted_address;
        } else {
         // window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  submit()
  {
        if (this.selectRoleRow.assign_area_id > 0)
      {


        /*this.api._update_branch(this.selectRoleRow).subscribe(data => {
          if (data.employee_id > 0)
          {
            this.api._upload_photo(this.Form, this.selectRoleRow.employee_id).subscribe(res => {

            });
            this.Form.reset();
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'success',
                title: 'Data Updated Successfully',
                showConfirmButton: false,
                timer: 1500
              });

        }
        });*/
      }
      else
      {
        this.api._add_survey(this.Form.value).subscribe(res => {
          this.Form.reset();
          Swal.fire({
              position: 'top-end',
              toast: true,
              icon: 'success',
              title: 'Data Inserted Successfully',
              showConfirmButton: false,
              timer: 1500
            });
          this.route.navigateByUrl('/survey');
        });
      }
  }

}
