import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  public loading = false;

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel() {
    this.snackBar.open('Puuuuha vi var lige ved at blive bange der...', 'x', {
      duration: 5000,
    });
    this.loading = true;
    this.dialogRef.close(false);
    this.loading = false;
  }

  onConfirm() {
    this.snackBar.open('Neeeeeeeej, det er vi meget meget kede af...', 'x', {
      duration: 5000,
    });
    this.loading = true;
    this.dialogRef.close(true);
    this.loading = false;
  }
}
