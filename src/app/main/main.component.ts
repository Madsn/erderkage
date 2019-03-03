import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CakeDialogComponent } from '../cake-dialog/cake-dialog.component';
import {ApiService} from '../api.service';
import {Subscription} from 'rxjs';
import {Cake} from '../cakes/cakes.component';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  loadingSubscription: Subscription;

  loading = false;
  title = 'Radar afdelingens kage plan';

  constructor(
    public cakeDialog: MatDialog,
    public apiService: ApiService) {
    this.loadingSubscription = this.apiService.onLoading$.subscribe((status) => setTimeout(() => this.loading = status, 0));
  }

  openCakeDialog(): void {
    const dialogRef = this.cakeDialog.open(CakeDialogComponent, {data: {isNew: true, cake: new Cake()}});
  }

}
