import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';


@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar) {

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

  openConfirmDialog(body: string, title: string = null): MatDialogRef<ConfirmDialogComponent> {
    const modalConfig = new MatDialogConfig();

    modalConfig.disableClose = true;
    modalConfig.autoFocus = true;
    modalConfig.data = {
      title,
      body
    };

    return this.dialog.open(ConfirmDialogComponent, modalConfig);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 4000
    });
  }
}
