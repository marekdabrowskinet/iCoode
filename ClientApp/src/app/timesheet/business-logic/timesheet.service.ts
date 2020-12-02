import { ContractSummary } from './../models/contract-summary.model';
import { TimesheetDay } from './../models/timesheet-day.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { table, time } from 'console';
import { ContractApi } from 'src/app/contracts/business-logic/contract.api';
import { DialogService } from 'src/app/core/dialogs/dialog.service';
import { SharedService } from 'src/app/core/shared.service';
import { TimesheetWork } from '../models/timesheet-work.model';
import { Timesheet } from '../models/timesheet.model';
import { TimesheetApi } from './timesheet.api';
import jsPDF from 'jspdf';
import { Contract } from 'src/app/contracts/models/contract.model';
import autoTable from 'jspdf-autotable';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CalibriFont } from 'src/app/core/calibri.font';


@Injectable({ providedIn: 'root' })
export class TimesheetService {
  private contractApi: ContractApi;
  private timesheetApi: TimesheetApi;

  constructor(
    private sharedService: SharedService,
    private dialogService: DialogService,
    public datepipe: DatePipe,
    private http: HttpClient) {
      this.contractApi = new ContractApi(http);
      this.timesheetApi = new TimesheetApi(http);
    }

    async readTimesheet(date: Date): Promise<Timesheet> {
      if (!date || date === null || date === undefined) {
        date = new Date();
      }
      this.sharedService.isBusy.emit('Proszę czekać...');
      if (await this.isTimesheetExists(date)) {
        const timesheet = await this.timesheetApi.read(date);
        this.sharedService.isBusy.emit();
        return timesheet;
      } else {
        this.sharedService.isBusy.emit();
        const userDecision = await this.dialogService.openConfirmDialog('Dla wybranego okresu nie istnieje arkusz czasu pracy, czy chcesz go utworzyć?').afterClosed().toPromise();
        if (userDecision) {
            this.sharedService.isBusy.emit('Trwa tworzenie arkusza...');
            const createdTimesheet = await this.createTimesheet(date);
            this.sharedService.isBusy.emit();
            if (createdTimesheet) {
              this.dialogService.openSnackBar('Pomyślnie utworzono arkusz');
              return createdTimesheet;
            } else {
              this.dialogService.openInfoDialog('Nie udało się utworzyć arkusza, skontaktuj się z administratorem');
              return new Timesheet();
            }
        }
      }
    }

    async isTimesheetExists(date: Date): Promise<boolean> {
       return await this.timesheetApi.isExist(date);
    }

    async createTimesheet(date: Date): Promise<Timesheet> {
      return await this.timesheetApi.create(date);
    }

    getDateString(date: Date, separator: string = ' '): string {
      date = new Date(date);
      let month = '';
      switch (date.getMonth() + 1) {
        case 1:
          month = 'STYCZEŃ';
          break;
        case 2:
          month = 'LUTY';
          break;
        case 3:
          month = 'MARZEC';
          break;
        case 4:
          month = 'KWIECIEŃ';
          break;
        case 5:
          month = 'MAJ';
          break;
        case 6:
          month = 'CZERWIEC';
          break;
        case 7:
          month = 'LIPIEC';
          break;
        case 8:
          month = 'SIERPIEŃ';
          break;
        case 9:
          month = 'WRZESIEŃ';
          break;
        case 10:
          month = 'PAŹDZIERNIK';
          break;
        case 11:
          month = 'LISTOPAD';
          break;
        case 12:
          month = 'GRUDZIEŃ';
          break;
        default:
          break;
      }
      return month + separator + date.getFullYear();
    }

  calculateWorksSumPerDay(works: TimesheetWork[]): number{
    let sum = 0;
    if (works.length > 0) {

      works.forEach(w => {
        sum += w.hoursWorked;
      });
    }
    return sum;
  }

  calculateWorksSumPerMonth(timesheet: Timesheet): ContractSummary[] {
    const result: ContractSummary[] = [];
    this.getUsedContracts(timesheet).forEach(contract => {
      let hours = 0;
      timesheet.days.forEach(day => {
        day.works.forEach(work => {
          if (work.contract.id === contract.id) {
            hours += work.hoursWorked;
          }
        });
      });
      const summary = new ContractSummary();
      summary.contract = contract;
      summary.wokrTime = hours;
      result.push(summary);
    });
    return result;
  }

  calculateAvailableTimePerDay(day: TimesheetDay): number {
    const startTime = 24;
    return startTime - this.calculateWorksSumPerDay(day.works);
  }

  async updateWorkDay(day: TimesheetDay): Promise<boolean> {
    this.sharedService.isBusy.emit('Trwa zapisywanie zmian...');
    const result = await this.timesheetApi.updateDay(day);
    this.sharedService.isBusy.emit();

    if (!result) {
      this.dialogService.openInfoDialog('Nie udało się zapisać zmian, skontaktuj się z administratorem systemu');
    } else {
      this.dialogService.openSnackBar('Pomyślnie zapisano zmiany');
    }
    return result;
  }

  generatePdfFiles(timesheet: Timesheet){
    const contracts = this.getUsedContracts(timesheet);
    timesheet.days.sort(function(a, b) {
      return  +new Date(a.date) - +new Date(b.date);
    });
    contracts.forEach(c => {
      this.generatePdfFilePerContract(timesheet, c);
    });
  }

  getUsedContracts(timesheet: Timesheet): Contract[] {
    const result: Contract[] = [];
    timesheet.days.forEach(day => {
      day.works.forEach(work => {
        if (!result.some(r => r.id === work.contract.id)) {
          result.push(work.contract);
        }
      });
    });
    return result;
  }

  generatePdfFilePerContract(timesheet: Timesheet, contract: Contract) {
    const doc = new jsPDF();
    const calibri = new CalibriFont();
    doc.addFileToVFS('Calibri Regular.ttf', calibri.font);
    doc.addFont('Calibri Regular.ttf', 'Calibri', 'regular');
    doc.setFont('Calibri', 'regular');
    doc.setFontSize(14);
    doc.text('EWIDENCJA CZASU PRACY   -   ' + this.getDateString(timesheet.date).toUpperCase(), 15, 15);
    doc.text('UMOWA NR:   ' + contract.number, 15, 23);
    doc.text('PRACOWNIK:   OLGA KOCHNIO', 15, 31);
    const head = [['Data', 'Liczba przepracowanych godzin', 'Podpis']];
    const body = [];
    timesheet.days.forEach(day => {
      if (day.works.some(w => w.contract.id === contract.id)){
        body.push([this.datepipe.transform(new Date(day.date), 'dd-MM-yyyy'), day.works.find(w => w.contract.id === contract.id).hoursWorked, '']);
      } else {
        body.push([this.datepipe.transform(new Date(day.date), 'dd-MM-yyyy'), 0, '']);
      }
    });

    autoTable(doc, {
      head,
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: '#888888',
        textColor: 'white'
      },
      body,
      styles: {
        cellWidth: 60,
        textColor: 'black',
      }
    });

    doc.save(contract.number + '_' + this.getDateString(timesheet.date, '_') + '.pdf');
  }
}
