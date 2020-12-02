import { TimesheetDay } from './../../models/timesheet-day.model';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from 'src/app/contracts/business-logic/contract.service';
import { Contract } from 'src/app/contracts/models/contract.model';
import { ITable } from 'src/app/core/interfaces/table.interface';
import { TimesheetService } from '../../business-logic/timesheet.service';
import { TimesheetWork } from '../../models/timesheet-work.model';
import { Timesheet } from '../../models/timesheet.model';


@Component({
  selector: 'app-timesheet-day',
  templateUrl: './timesheet-day.component.html',
  styleUrls: ['./timesheet-day.component.scss']
})
export class TimesheetDayComponent implements ITable<TimesheetWork>, OnInit, OnChanges{
  @Input() public selectedDay: TimesheetDay = new TimesheetDay();
  @Output() onAddWork = new EventEmitter();
  newWork: TimesheetWork = new TimesheetWork();
  comment: string;
  leftTime: number;
  displayedColumns: string[] = ['contractNo', 'contractDescribe', 'workedHours', 'action'];
  tableItems: MatTableDataSource<TimesheetWork> = new MatTableDataSource<TimesheetWork>();
  contracts: Contract[] = [];

  constructor(private timesheetService: TimesheetService,
              private contractService: ContractService) {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.selectedDay) {
      this.loadTableItems();
      this.leftTime = this.timesheetService.calculateAvailableTimePerDay(this.selectedDay);
      this.comment = this.selectedDay.comments;
    }
  }

  async ngOnInit() {
    this.contracts = await this.contractService.getContracts();
  }

  loadTableItems() {
    this.tableItems.data = this.selectedDay.works;
  }

  async addWork() {
    if (this.selectedDay.works.find(w => w.contract.id === this.newWork.contract.id)){
      this.selectedDay.works.find(w => w.contract.id === this.newWork.contract.id).hoursWorked += this.newWork.hoursWorked;
    } else {
      this.selectedDay.works.push(this.newWork);
    }
    if (await this.timesheetService.updateWorkDay(this.selectedDay)) {
      this.leftTime = this.timesheetService.calculateAvailableTimePerDay(this.selectedDay);
      this.onAddWork.emit();
      this.newWork = new TimesheetWork();
      this.loadTableItems();
    }
  }

  async saveComments() {
    this.selectedDay.comments = this.comment;
    await this.timesheetService.updateWorkDay(this.selectedDay);
  }

  async removeWork(work: TimesheetWork){
    const index = this.selectedDay.works.indexOf(work, 0);
    if (index > -1) {
      this.selectedDay.works.splice(index, 1);
    }

    if (await this.timesheetService.updateWorkDay(this.selectedDay)) {
      this.leftTime = this.timesheetService.calculateAvailableTimePerDay(this.selectedDay);
      this.onAddWork.emit();
      this.loadTableItems();
    }
  }
}
