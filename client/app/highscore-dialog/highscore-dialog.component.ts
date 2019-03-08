import { Component, OnDestroy } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {DataSource} from '@angular/cdk/table';
import {Highscore} from '../models/common';

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
    this.highscores = new Highscores(this.apiService);
    this.dataSource = new HighscoresDataSource(this.highscores);
  }

  ngOnDestroy(): void {
  }
}

export class Highscores {
  dataChange: BehaviorSubject<Highscore[]> = new BehaviorSubject<Highscore[]>([]);
  get data(): Highscore[] { return this.dataChange.value; }

  constructor(private apiService: ApiService) {
    this.apiService.getHighscores()
      .subscribe((highscores) => {
        this.dataChange.next(highscores);
        this.apiService.loading(false);
      });
  }
}

export class HighscoresDataSource extends DataSource<any> {
  constructor(private highscores: Highscores) {
    super();
  }

  connect(): Observable<Highscore[]> {
    return this.highscores.dataChange;
  }

  disconnect() {
  }

}