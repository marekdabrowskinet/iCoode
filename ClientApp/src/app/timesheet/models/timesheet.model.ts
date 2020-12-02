import { TimesheetDay } from './timesheet-day.model';

export class Timesheet {
  id: number;
  date: Date = new Date();
  days: TimesheetDay[] = [];
  cost: number;
}
