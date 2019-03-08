import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CakeDialogComponent } from '../cake-dialog/cake-dialog.component';
import {ApiService} from '../api.service';
import {Subscription} from 'rxjs';
import {Cake} from '../cakes/cakes.component';
import {HighscoreDialogComponent} from '../highscore-dialog/highscore-dialog.component';
import {CalendarDialogComponent} from "../calendar-dialog/calendar-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  loadingSubscription: Subscription;

  loading = false;
  title = 'Radar SW kage plan';
  gitHash = '';
  gitTag = '';

  constructor(
    public cakeDialog: MatDialog,
    public highscoreDialog: MatDialog,
    public calendarDialog: MatDialog,
    public apiService: ApiService) {
    this.loadingSubscription = this.apiService.onLoading$.subscribe((status) => setTimeout(() => this.loading = status, 0));
  }

  openCakeDialog(): void {
    const dialogRef = this.cakeDialog.open(CakeDialogComponent, {data: {isNew: true, cake: new Cake()}});
  }
  openCalendarDialog(): void {
    const dialogRef = this.calendarDialog.open(CalendarDialogComponent);
  }

  openHighscoreDialog(): void {
    const dialogRef = this.highscoreDialog.open(HighscoreDialogComponent);
  }
}
