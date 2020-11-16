import { SpinnerComponent } from './spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedService } from './shared.service';
import { DialogService } from './dialogs/dialog.service';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    InfoDialogComponent,
    ConfirmDialogComponent
  ],
  imports:  [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatChipsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatStepperModule,
    MatTreeModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    InfoDialogComponent,
    ConfirmDialogComponent
  ],
  exports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRippleModule,
    MatCardModule,
    MatExpansionModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTreeModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    SpinnerComponent
  ],
  providers: [
    MatDatepickerModule,
    SharedService,
    DialogService
  ]
})
export class CoreModule {
  constructor() {
  }
}
