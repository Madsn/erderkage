import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {ApiService} from '../api.service';
import {DataSource} from '@angular/cdk/collections';
import {CakeDialogComponent} from '../cake-dialog/cake-dialog.component';
import {MatDialog} from '@angular/material';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {Cake} from '../models/common';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.scss']
})
export class CakesComponent implements OnInit, OnDestroy {

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

  public innerWidth: any;

  columnDefinitions = [
    { def: 'initials', showMobile: true },
    { def: 'cake', showMobile: true },
    { def: 'timestamp', showMobile: false },
    { def: 'countdown', showMobile: true },
    { def: 'claps', showMobile: false },
    { def: 'options', showMobile: true }
  ];

  createCakeSubscription: Subscription;
  updateCakeSubscription: Subscription;
  deleteCakeSubscription: Subscription;

  cakes: Cakes;
  dataSource: CakesDataSource;
  nowTime = new Date().getTime();

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  getDisplayedColumns(): string[] {
    const isMobile = this.innerWidth <= 736;
    return this.columnDefinitions
      .filter(cd => !isMobile || cd.showMobile)
      .map(cd => cd.def);
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

  incrementClaps(cake: Cake) {
    cake.claps += 1;
    this.apiService.likeCake(cake);
  }

  ngOnDestroy(): void {
    this.createCakeSubscription.unsubscribe();
    this.updateCakeSubscription.unsubscribe();
    this.deleteCakeSubscription.unsubscribe();
  }
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
