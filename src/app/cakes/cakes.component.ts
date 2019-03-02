import {Component, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {ApiService} from '../api.service';
import {DataSource} from '@angular/cdk/collections';
import {CakeDialogComponent} from '../cake-dialog/cake-dialog.component';
import {MatDialog} from '@angular/material';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnDestroy {

  createCakeSubscription: Subscription;
  updateCakeSubscription: Subscription;
  deleteCakeSubscription: Subscription;

  cakes: Cakes;
  dataSource: CakesDataSource;
  nowTime = new Date().getTime();

  constructor(
    public apiService: ApiService,
    public cakeDialog: MatDialog,
    public deleteDialog: MatDialog
  ) {
    this.cakes = new Cakes(this.apiService);
    this.dataSource = new CakesDataSource(this.cakes);
    this.createCakeSubscription = this.apiService.onCreateCake$.subscribe(cake => this.cakes.addCake(cake));
    this.updateCakeSubscription = this.apiService.onUpdateCake$.subscribe(cake => this.cakes.editCake(cake));
    this.deleteCakeSubscription = this.apiService.onDeleteCake$.subscribe(cake => this.cakes.removeCake(cake));
  }

  openEditDialog(cake: Cake) {
    this.cakeDialog.open(CakeDialogComponent, {data: {isNew: false, cake}});
  }

  openDeleteDialog(cake: Cake) {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {data: {name: cake.cake}});
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.apiService.deleteCake(cake);
        }
      });
  }

  ngOnDestroy(): void {
    this.createCakeSubscription.unsubscribe();
    this.updateCakeSubscription.unsubscribe();
    this.deleteCakeSubscription.unsubscribe();
  }
}

export class Cake {
  _id?: string;
  initials: string;
  cake: string;
  date: string;
  time: string;
  timestamp?: string;
}

export class Cakes {
  dataChange: BehaviorSubject<Cake[]> = new BehaviorSubject<Cake[]>([]);
  get data(): Cake[] { return this.dataChange.value; }

  constructor(private apiService: ApiService) {
    this.apiService.getCakes()
      .subscribe((cakes) => {
        this.dataChange.next(cakes);
        this.apiService.loading(false);
      });
  }

  addCake(cake: Cake) {
    this.data.push(cake);
    this.dataChange.next(this.data);
    this.apiService.loading(false);
  }

  editCake(cake: Cake) {
    this.apiService.getCakes()
      .subscribe((cakes) => {
        this.dataChange.next(cakes);
        this.apiService.loading(false);
      });
    this.apiService.loading(false);
  }

  removeCake(cake: Cake) {
    let index = this.data.indexOf(cake);
    this.data.findIndex((obj, i) => {
      if (obj._id === cake._id) {
        index = i;
        return true;
      }
    });
    this.data.splice(index, 1);
    this.dataChange.next(this.data);
    this.apiService.loading(false);
  }
}

export class CakesDataSource extends DataSource<any> {
  constructor(private cakes: Cakes) {
    super();
  }

  connect(): Observable<Cake[]> {
    return this.cakes.dataChange;
  }

  disconnect() {
  }
}
