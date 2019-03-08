import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { CakeDialogComponent } from './cake-dialog/cake-dialog.component';
import { CakesComponent } from './cakes/cakes.component';

import {CountdownModule} from 'ngx-countdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatSnackBarModule,
  MatMenuModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatTableModule,
  MatToolbarModule,
  MatBadgeModule
} from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { HighscoreDialogComponent } from './highscore-dialog/highscore-dialog.component';
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';

registerLocaleData(localeDa, 'da');

@NgModule({
  declarations: [
    MainComponent,
    CakeDialogComponent,
    CakesComponent,
    DeleteDialogComponent,
    HighscoreDialogComponent,
    CalendarDialogComponent
  ],
  entryComponents: [
    CakeDialogComponent,
    DeleteDialogComponent,
    HighscoreDialogComponent,
    CalendarDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CountdownModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSortModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'da' },
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
