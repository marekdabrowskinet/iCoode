import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/presentation/dashboard.component';
import { TimesheetComponent } from './timesheet/presentation/timesheet.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'Timesheet', component: TimesheetComponent, canActivate: [AuthGuard]},
  { path: 'Sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

