import { AuthenticationService } from './../../authentication/auth.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  styles: [' .container { text-align: center; } '],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit{
    constructor(public authService: AuthenticationService,
                public router: Router) {
    }
  ngOnInit(): void {
  }

}
