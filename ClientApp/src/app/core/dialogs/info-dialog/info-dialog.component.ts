import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalBaseComponent } from '../dialog-base.component';


@Component({
  selector: 'app-input-modal',
  templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent extends ModalBaseComponent<InfoDialogComponent> {
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialogRef);
  }
}
