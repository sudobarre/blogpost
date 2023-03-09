import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h1 mat-dialog-title>Confirm Delete</h1>
    <mat-dialog-content>Are you sure you want to delete this {{data.name}}?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button [mat-dialog-close]="true" style="margin-top: 2px; margin-left: auto"
                color="warn"
                mat-button
                type="submit">Delete</button>
    </mat-dialog-actions>
  `
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}

   onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}

