import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ApiService} from '../api.service';
import {Cake} from '../models/common';

@Component({
  selector: 'app-cake-dialog',
  templateUrl: './cake-dialog.component.html',
  styleUrls: ['./cake-dialog.component.css']
})
export class CakeDialogComponent {

  confirmBtn = 'Jeg Giver Kage';

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CakeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService) {
    if (!data.isNew) {
      this.confirmBtn = 'Opdater Min Kage';
    } else {
      data.cake.date = new Date().toISOString().substring(0, 10);
      data.cake.time = '10:00';
    }
  }

  onSave(cake: Cake) {
    if (this.data.isNew) {
      this.snackBar.open('Jubiiiii, det glæder vi os rigtig meget til...', 'x', {
        duration: 5000,
      });
      this.apiService.createCake(cake);
      this.dialogRef.close();
    } else {
      this.snackBar.open('Vi elsker kage, så alt kage er velkommen...', 'x', {
        duration: 5000,
      });
      this.apiService.updateCake(cake);
      this.dialogRef.close(true);
    }
  }
}
