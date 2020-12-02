import { TimesheetWork } from './timesheet-work.model';

export class TimesheetDay {
  id: number;
  date: Date;
  works: TimesheetWork[] = [];
  worksSum: number;
  comments: string;
}
