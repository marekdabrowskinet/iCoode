import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from './authentication/auth.service';
import { SharedService } from './core/shared.service';
import { SpinnerComponent } from './core/spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spinner: MatDialogRef<SpinnerComponent>;

  constructor(private authService: AuthenticationService,
              private sharedService: SharedService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.sharedService.isBusy.subscribe(text => {
      if (text) {
        this.showSpinner(text);
      } else {
        this.hideSpinner();
      }
    });
  }

  showSpinner(text: string) {
    const modalConfig = new MatDialogConfig();

    modalConfig.disableClose = true;
    modalConfig.autoFocus = true;
    modalConfig.data = {
      message: text,
    };

    this.spinner = this.dialog.open(SpinnerComponent, modalConfig);
  }

  hideSpinner() {
    this.spinner.close();
  }
}
