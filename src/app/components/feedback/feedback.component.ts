import { Component, HostListener  } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as FullStory from '@fullstory/browser';

export interface FeedbackData {
  nps: number; // net promoter score
  osat: number; // overall satisfaction
  comments: string; // free-form text comments
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  constructor(public dialog: MatDialog) { }

  feedbackSubmitted(event: CustomEvent): void{
    console.log('Window dispatched event triggered');
  }

  @HostListener('window:feedback', ['$event'])
  feedback(event: CustomEvent) {
    FullStory.event('Feedback_Submitted',{nps: event.detail.nps, osat: event.detail.osat, comments: event.detail.comments});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialog, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(data => {
      const { nps, osat, comments } = data;
   
      // broadcasts a CustomEvent
      // see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
      window.dispatchEvent(new CustomEvent('feedback', { detail: { nps, osat, comments }}));
    });
  }
}

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback.dialog.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackDialog {
  data: FeedbackData = {
    nps: 0,
    osat: 0,
    comments: '',
  };

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialog>,
  ) { }

  close(): void {
    FullStory.event('Feedback_Close',{'message':'Close Feedback Dialog'});
    this.dialogRef.close();
  }
}