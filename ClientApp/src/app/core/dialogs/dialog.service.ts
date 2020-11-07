import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';


@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog) {

  }

  openInfoDialog(body: string, title: string = null) {
    const modalConfig = new MatDialogConfig();

    modalConfig.disableClose = true;
    modalConfig.autoFocus = true;
    modalConfig.data = {
      title,
      body
    };

    this.dialog.open(InfoDialogComponent, modalConfig);
  }
}
