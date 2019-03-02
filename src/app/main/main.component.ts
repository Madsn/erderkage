import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CakeDialogComponent } from '../cake-dialog/cake-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'Er der kage nu?';

  constructor(public cakeDialog: MatDialog) { }

  ngOnInit() {
  }

  openCakeDialog(): void {
    const dialogRef = this.cakeDialog.open(CakeDialogComponent);
  }

}
