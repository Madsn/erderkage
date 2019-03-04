import { Component, OnDestroy } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {ApiService} from '../api.service';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';

@Component({
  selector: 'app-highscore-dialog',
  templateUrl: './highscore-dialog.component.html',
  styleUrls: ['./highscore-dialog.component.css']
})
export class HighscoreDialogComponent implements OnDestroy {

  highscores: Highscores;
  dataSource: HighscoresDataSource;

  constructor(
    public apiService: ApiService
  ) {

  }

  ngOnDestroy(): void {
  }
}

export class Highscore {
  _id?: string;
  count: number;
}

export class Highscores {

}

export class HighscoresDataSource extends DataSource<any> {

  connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
    return undefined;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
