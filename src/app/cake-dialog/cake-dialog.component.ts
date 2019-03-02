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

  confirmBtn = 'Tilføj Kage';

  constructor(public dialogRef: MatDialogRef<CakeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private apiService: ApiService) {
    if (!data.isNew) {
      this.confirmBtn = 'Gem Kage';
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
