import { TimesheetDay } from './../../models/timesheet-day.model';
import { Timesheet } from './../../models/timesheet.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from 'src/app/contracts/business-logic/contract.service';
import { ITable } from 'src/app/core/interfaces/table.interface';
import { TimesheetService } from '../../business-logic/timesheet.service';

@Component({
  selector: 'app-timesheet-calendar',
  templateUrl: './timesheet-calendar.component.html',
  styleUrls: ['./timesheet-calendar.component.scss'],
})
export class TimesheetCalendarComponent implements ITable<TimesheetDay>, OnInit{
  @Input() public currentTimesheet: Timesheet = new Timesheet();
  public dateString: string;
  public displayedColumns: string[] = ['date', 'workTime', 'comments'];
  public tableItems: MatTableDataSource<TimesheetDay> = new MatTableDataSource<TimesheetDay>();
  private selectedDay: TimesheetDay;
  @Output() onSelectDay = new EventEmitter<TimesheetDay>();
  @Output() onSelectTimesheet = new EventEmitter<Timesheet>();

  constructor(private timesheetService: TimesheetService,
              private contractService: ContractService) {

    }

  async loadTableItems() {
    this.tableItems.data = this.currentTimesheet.days;
    this.tableItems.data.forEach(d => {
      d.worksSum = this.timesheetService.calculateWorksSumPerDay(d.works);
    });
  }

  async ngOnInit() {
    await this.refreshTimesheet();
  }

  getCssClass(day: TimesheetDay): string {
    let result = '';
    const date = new Date(day.date);
    if (date.getDay() === 0 || date.getDay() === 6){
      result += 'isWeekend ';
    }

    if (day.worksSum > 0) {
      result += 'isWorkingDay ';
    }

    if (this.selectedDay && day.id === this.selectedDay.id) {
      result += 'isSelectedDay';
    }
    return result;
  }

  public async changeTimesheet(direction: string) {
    const date = new Date(this.currentTimesheet.date);
    if (direction === 'previous') {
      date.setMonth(date.getMonth() - 1);
    } else if (direction === 'next') {
      date.setMonth(date.getMonth() + 1);
    }
    this.currentTimesheet = await this.readTimesheet(date);
    await this.loadTableItems();
    this.dateString = this.getDateString();
    this.onSelectTimesheet.emit(this.currentTimesheet);
    this.selectDay(null);
  }

  getDateString(): string{
    return this.timesheetService.getDateString(this.currentTimesheet.date);
  }

  async readTimesheet(date: Date): Promise<Timesheet> {
    let timesheet = await this.timesheetService.readTimesheet(date);
    timesheet.days.sort(function(a, b) {
      return  +new Date(a.date) - +new Date(b.date);
    });
    return timesheet;
  }

  async refreshTimesheet() {
    this.currentTimesheet = await this.readTimesheet(this.currentTimesheet.date);
    this.dateString = this.getDateString();
    await this.loadTableItems();
    this.onSelectTimesheet.emit(this.currentTimesheet);
  }

  selectDay(day: TimesheetDay) {
    this.selectedDay = day;
    this.onSelectDay.emit(day);
  }
}
