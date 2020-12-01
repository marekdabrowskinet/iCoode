import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from 'src/app/contracts/business-logic/contract.service';
import { ITable } from 'src/app/core/interfaces/table.interface';
import { TimesheetService } from '../../business-logic/timesheet.service';
import { TimesheetDay } from '../../models/timesheet-day.model';
import { Timesheet } from '../../models/timesheet.model';


@Component({
  selector: 'app-timesheet-month-summary',
  templateUrl: './timesheet-month-summary.component.html',
  styleUrls: ['./timesheet-month-summary.component.scss']
})
export class TimesheetMonthSummaryComponent implements OnChanges, OnInit{
  @Input() public currentTimesheet: Timesheet = new Timesheet();
  public dateString: string;
  public worksSummary: number = 0;

  constructor(private timesheetService: TimesheetService,
              private contractService: ContractService) {

  }
  ngOnInit(): void {
    if (this.currentTimesheet.days.length > 0) {
      this.worksSummary = this.calculateWorksSumPerMonth();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dateString = this.getDateString();
    if (this.currentTimesheet.days.length > 0) {
      this.worksSummary = this.calculateWorksSumPerMonth();
    }
  }

  public calculateWorksSumPerMonth(): number {
    return this.timesheetService.calculateWorksSumPerMonth(this.currentTimesheet);
  }

  getDateString(): string{
    return this.timesheetService.getDateString(this.currentTimesheet.date);
  }

  print(){
    this.timesheetService.generatePdfFiles(this.currentTimesheet);
  }
}
