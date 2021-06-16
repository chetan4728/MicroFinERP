import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { SurveyService } from 'src/app/services/survey.service';
import { environment } from 'src/environments/environment.prod';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-viewsurvey',
  templateUrl: './viewsurvey.component.html',
  styleUrls: ['./viewsurvey.component.scss']
})
export class ViewsurveyComponent implements OnInit {
private SurveyId;
private Session:any;
latitude: number;
longitude: number;
zoom:number;
row:any;
  constructor(private ngZone: NgZone,private mapsAPILoader: MapsAPILoader,private api:SurveyService,private param:ActivatedRoute,private session:LocalStorageService) {

   }

  ngOnInit(): void {
    this.Session = this.session.get(environment.userSession);
    this.SurveyId = this.param.snapshot.paramMap.get('id');
    if(this.SurveyId!=null)
    {
      this.api._get_app_survey({bank_id:this.Session.bank_id,survey_no:this.SurveyId}).subscribe(data => {
      // console.log(data);
       this.row = data;
     
       this.latitude = parseFloat(this.row.survey_lat);
       this.longitude = parseFloat(this.row.survey_long);
       this.zoom = 15;
      });
    }
  }

}
