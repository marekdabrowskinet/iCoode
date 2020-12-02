import { TimesheetCalendarComponent } from './timesheet-calendar/timesheet-calendar.component';
import { ContractService } from './../../contracts/business-logic/contract.service';
import { ITable } from './../../core/interfaces/table.interface';
import { Timesheet } from './../models/timesheet.model';
import { TimesheetService } from './../business-logic/timesheet.service';
import { AuthenticationService } from '../../authentication/auth.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { TimesheetDay } from '../models/timesheet-day.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit{
  @ViewChild(TimesheetCalendarComponent) calendar: TimesheetCalendarComponent;

  public currentTimesheet: Timesheet = new Timesheet();
  public selectedDay: TimesheetDay;


  constructor() {
  }

  async ngOnInit() {
  }
}
