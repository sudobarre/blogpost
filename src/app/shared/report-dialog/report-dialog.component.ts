import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent {
  reportForm: FormGroup;
  
  //change it later
  reportPayload: object;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: object) {
    this.reportForm = new FormGroup({
      description: new FormControl('', Validators.required)
    });

    //for backend? idk its just a text
    this.reportPayload = {
      description: ''
    }
}

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  discard() {
    this.dialogRef.close();
  }

  report() {
    this.dialogRef.close();
    this.reportPayload = this.reportForm.get('description')?.value ? this.reportForm.get('description')?.value : '';
    this.openSnackBar();
    //send the report reason to the backend here, or do sth with the report idk lol
  }

  openSnackBar(){
    this._snackBar.open("Thank you, your report has been submitted.", "", {
      duration: 2000,
    });
  }
}
