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
import { BranchService } from 'src/app/services/branch.service';
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
  branch_name:any;
  selectRoleRow: Survey = { date_assigned:null, assign_area_id:0 ,bank_id:null, area_name:null, branch_id:0 , latitude:null, longitude:null ,user_id:0};
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(private param: ActivatedRoute ,private route: Router , private formBuilder: FormBuilder ,public local: LocalStorageService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private dp: DropDownsService ,private api: SurveyService,private branch_api:BranchService) { }

  ngOnInit(): void {
    
    this.initForm();
    this.SessionData = this.local.get(environment.userSession);
    this.selectRoleRow.branch_id = this.SessionData.employee_branch_id;
    this.selectRoleRow.bank_id = this.SessionData.bank_id;
    const id = this.param.snapshot.paramMap.get('id');
    this.getBranch();
  
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


    if(id!=null)
    {
      this.api._get_survey_row({bank_id:this.SessionData.bank_id,assign_area_id:id}).subscribe((survey: Survey[])  => {
   
       this.selectRoleRow = survey[0];
        this.latitude = parseFloat(survey[0].latitude);
        this.longitude = parseFloat(survey[0].longitude);
      });
    }
  }

  load_emp():void{
   
    this.dp._get_branch_employee({branch_id:this.selectRoleRow.branch_id}).subscribe(data  => {
      this.employeeDp = data;
  });
  }

  initForm(): void {
    this.Form = this.formBuilder.group({
      user_id: ['', Validators.required],
      area_name: ['', Validators.required],
      date_assigned:[''],
      branch_id:[''],
      bank_id: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],

    });


  }
  getBranch()
  {
    this.branch_api._get_branch({bank_id:this.SessionData.bank_id}).subscribe(data =>{

      this.branch_name = data;
    })
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


        this.api._update_survey(this.selectRoleRow).subscribe(data => {
          this.Form.reset();
          Swal.fire({
              position: 'top-end',
              toast: true,
              icon: 'success',
              title: 'Data Updated Successfully',
              showConfirmButton: false,
              timer: 1500
            });
          this.route.navigateByUrl('/survey');
        });
      }
      else
      {
     ///   console.log(this.Form.value)

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
