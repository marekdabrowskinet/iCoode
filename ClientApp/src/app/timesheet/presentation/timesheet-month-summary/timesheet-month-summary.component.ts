import { Contract } from './../../../contracts/models/contract.model';
import { ITable } from './../../../core/interfaces/table.interface';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from 'src/app/contracts/business-logic/contract.service';
import { TimesheetService } from '../../business-logic/timesheet.service';
import { TimesheetDay } from '../../models/timesheet-day.model';
import { Timesheet } from '../../models/timesheet.model';
import { ContractSummary } from '../../models/contract-summary.model';


@Component({
  selector: 'app-timesheet-month-summary',
  templateUrl: './timesheet-month-summary.component.html',
  styleUrls: ['./timesheet-month-summary.component.scss']
})
export class TimesheetMonthSummaryComponent implements OnChanges, OnInit, ITable<ContractSummary>{
  @Input() public currentTimesheet: Timesheet = new Timesheet();
  public dateString: string;
  public worksSummary: number = 0;
  displayedColumns: string[] = ['number', 'workTime', 'cost', 'action'];
  tableItems: MatTableDataSource<ContractSummary> = new MatTableDataSource<ContractSummary>();

  constructor(private timesheetService: TimesheetService,
              private contractService: ContractService) {

  }

  loadTableItems() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    if (this.currentTimesheet.days.length > 0) {
      this.tableItems.data = this.calculateWorksSumPerMonth();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dateString = this.getDateString();
    if (this.currentTimesheet.days.length > 0) {
      this.tableItems.data = this.calculateWorksSumPerMonth();
    }
  }

  public calculateWorksSumPerMonth() {
    return this.timesheetService.calculateWorksSumPerMonth(this.currentTimesheet);
  }

  getDateString(): string{
    return this.timesheetService.getDateString(this.currentTimesheet.date);
  }

  print(contract?: Contract){
    if (!contract){
      this.timesheetService.generatePdfFiles(this.currentTimesheet);
    } else {
      this.timesheetService.generatePdfFilePerContract(this.currentTimesheet, contract);
    }
  }
}
