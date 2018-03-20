import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { SettingsService } from '../../../services/settings-service/settings-service';
import { Setting } from '../../../model/model-interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  setting: Setting = {};
  

  constructor( private location: Location, private settingservice: SettingsService) { }

  ngOnInit() {
    

    this.settingservice.getSetting().subscribe(data =>{
      this.setting = data;
     
  });
  }

  saveProfil(value: any){
      this.setting = value;
      this.settingservice.updateSetting(this.setting).subscribe(
        setting => {
          console.log("Settingänderung erfolgreich gespeichert!", setting);
          this.setting = setting;
        }
      );
      console.log(this.setting.gitlabapitoken);
  }

  cancel() {
    this.location.back();
    return false;
  }

}
