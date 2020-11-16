import { TimesheetComponent } from './timesheet/presentation/timesheet.component';
import { AuthGuard } from './authentication/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/presentation/dashboard.component';
import { ContractsComponent } from './contracts/presentation/contracts.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'Timesheet', component: TimesheetComponent, canActivate: [AuthGuard]},
  { path: 'Contracts', component: ContractsComponent, canActivate: [AuthGuard]},
  { path: 'Sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
