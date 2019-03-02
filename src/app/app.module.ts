import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { CakeDialogComponent } from './cake-dialog/cake-dialog.component';
import { CakesComponent } from './cakes/cakes.component';

import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MatMomentDateModule} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [
    MainComponent,
    CakeDialogComponent,
    CakesComponent
  ],
  entryComponents: [
    CakeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'da-DK'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
