import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  styles: [' .container { text-align: center; } '],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit{
    constructor() {
    }
  ngOnInit(): void {
  }

}
