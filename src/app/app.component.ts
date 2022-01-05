import { Component } from '@angular/core';
import * as FullStory from '@fullstory/browser';
import { environment } from '../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Shoppe';
  deviceInfo = null;
  constructor(private deviceService: DeviceDetectorService) {
    const { orgId } = environment;
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // load the FullStory recording snippet if an orgId is set
    if (orgId) {
      FullStory.init({ orgId, debug: false });
      FullStory.setUserVars({'deviceInfo': this.deviceInfo});
    }
  }
}
