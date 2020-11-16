import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalBaseComponent } from '../dialog-base.component';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent extends ModalBaseComponent<ConfirmDialogComponent> {
  message: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
             @Inject(MAT_DIALOG_DATA) data) {
      super(dialogRef);
      this.message = data.body;
    }
}
