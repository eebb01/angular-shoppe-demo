import { Component, OnInit } from '@angular/core';
import * as FullStory from '@fullstory/browser';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styles: []
})
export class ThankYouComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    FullStory.event('ThankyouEventUp',{message:'user redirected to thank you page'});
  }

}
