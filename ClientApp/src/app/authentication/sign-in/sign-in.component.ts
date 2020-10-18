import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth.service';
import { User } from '../user.model';


@Component({
  selector: 'app-login',
  styles: [' .container { text-align: center; } '],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
    hide = true;
    user: User = new User();

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
    }

    ngOnInit() {
  }

    async signIn() {
      //this.error = undefined;
      await this.authenticationService.signIn(this.user.username, this.user.password);
      if (this.authenticationService.userIsLogged()) {
        alert('ok');
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
