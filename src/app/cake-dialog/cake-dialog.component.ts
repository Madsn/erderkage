import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiService} from '../api.service';
import {Cake} from '../cakes/cakes.component';

@Component({
  selector: 'app-cake-dialog',
  templateUrl: './cake-dialog.component.html',
  styleUrls: ['./cake-dialog.component.css']
})
export class CakeDialogComponent {

  confirmBtn = 'Jeg Giver Kage';

  constructor(public dialogRef: MatDialogRef<CakeDialogComponent>,
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
      this.apiService.createCake(cake);
      this.dialogRef.close();
    } else {
      this.apiService.updateCake(cake);
      this.dialogRef.close(true);
    }
  }
}
