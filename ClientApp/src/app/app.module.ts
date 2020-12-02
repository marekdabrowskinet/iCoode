import { ContractService } from './contracts/business-logic/contract.service';
import { TimesheetComponent } from './timesheet/presentation/timesheet.component';
import { MenuComponent } from './menu/presentation/menu.component';
import { GlobalErrorHandler } from './core/global-error-handler';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationService } from './authentication/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './authentication/http.interceptor';
import { JwtInterceptor } from './authentication/jwt.interceptor';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/presentation/dashboard.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContractsComponent } from './contracts/presentation/contracts.component';
import { TimesheetService } from './timesheet/business-logic/timesheet.service';
import { TimesheetDayComponent } from './timesheet/presentation/timesheet-day/timesheet-day.component';
import { TimesheetMonthSummaryComponent } from './timesheet/presentation/timesheet-month-summary/timesheet-month-summary.component';
import { TimesheetCalendarComponent } from './timesheet/presentation/timesheet-calendar/timesheet-calendar.component';
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    MenuComponent,
    TimesheetComponent,
    TimesheetDayComponent,
    TimesheetMonthSummaryComponent,
    TimesheetCalendarComponent,
    ContractsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    AuthenticationService,
    ContractService,
    TimesheetService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
