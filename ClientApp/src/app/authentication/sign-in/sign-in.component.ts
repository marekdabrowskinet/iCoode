import { SharedService } from './../../core/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth.service';
import { User } from '../user.model';
import { DialogService } from 'src/app/core/dialogs/dialog.service';


@Component({
  selector: 'app-login',
  styles: [' .container { text-align: center; } '],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
    hide = true;
    user: User = new User();

    constructor(private authenticationService: AuthenticationService,
                private dialogService: DialogService,
                private router: Router,
                private sService: SharedService) {
    }

    ngOnInit() {
  }

    async signIn() {
      this.sService.isBusy.emit('Trwa logowanie');
      await this.authenticationService.signIn(this.user.username, this.user.password);
      this.sService.isBusy.emit();
      if (this.authenticationService.userIsLogged()) {
        //this.openSnackBar('Pomyślnie zalogowano do aplikacji.');
        this.router.navigate(['/']);
        //this.sharedService.onEmployeeLogged.emit(true);
      } else {
        //this.error = new InfoModel('Błędne dane logowania', 'error', InfoTypes.Error);
      }
    }

  // openSnackBar(message: string) {
  //   this.snackBar.open(message, undefined, {
  //     duration: 4000
  //   });
  // }
}
