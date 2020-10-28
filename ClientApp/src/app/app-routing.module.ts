import { AuthGuard } from './authentication/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/presentation/dashboard.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'Sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
