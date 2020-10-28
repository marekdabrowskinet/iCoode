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
import { FlexLayoutModule } from '@angular/flex-layout/typings/module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
