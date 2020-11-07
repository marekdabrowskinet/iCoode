import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from './dialogs/dialog.service';
import { SharedService } from './shared.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private sharedService: SharedService,
    private dialogService: DialogService,
    private dialog: MatDialog) {}

  handleError(error) {
    this.sharedService.isBusy.emit();
    console.log(error);
  }
}
