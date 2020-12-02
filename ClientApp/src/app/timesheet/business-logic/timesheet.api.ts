import { TimesheetDay } from './../models/timesheet-day.model';
import { promise } from 'protractor';
import { Api } from 'src/app/core/api';
import { Timesheet } from '../models/timesheet.model';


export class TimesheetApi extends Api {
  async read(date: Date): Promise<Timesheet> {
    date = new Date(date);
    return await this.httpClient.get<Timesheet>('https://localhost:44324/api/Timesheet/Read', {
      params: {
        date : date.toISOString()
      }}).toPromise();
  }

  async isExist(date: Date): Promise<boolean> {
    date = new Date(date);
    return await this.httpClient.get<boolean>('https://localhost:44324/api/Timesheet/IsExist', {
      params: {
        date : date.toISOString()
      }}).toPromise();
  }

  async create(date: Date): Promise<Timesheet> {
    date = new Date(date);
    return await this.httpClient.get<Timesheet>('https://localhost:44324/api/Timesheet/Create', {
      params: {
        date : date.toISOString()
      }}).toPromise();
  }

  async updateDay(day: TimesheetDay): Promise<boolean> {
    return await this.httpClient.post<boolean>('https://localhost:44324/api/Timesheet/UpdateDay', day).toPromise();
  }
}
