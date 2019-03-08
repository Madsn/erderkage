import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';
import {Cake, Highscore} from './models/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string;

  private loadingSource = new Subject<boolean>();
  onLoading$ = this.loadingSource.asObservable();

  private createCakeSource = new Subject<Cake>();
  onCreateCake$ = this.createCakeSource.asObservable();
  private deleteCakeSource = new Subject<Cake>();
  onDeleteCake$ = this.deleteCakeSource.asObservable();
  private updateCakeSource = new Subject<Cake>();
  onUpdateCake$ = this.updateCakeSource.asObservable();

  constructor(private http: HttpClient) {
    this.url = environment.api;
  }

  getCakes() {
    this.loadingSource.next(true);
    return this.http.get<Cake[]>(`${this.url}/cakes`);
  }

  createCake(cake: Cake) {
    this.loadingSource.next(true);
    cake.timestamp = new Date(cake.date + 'T' + cake.time + ':00+01:00').getTime().toString();
    cake.date = new Date(cake.date + 'T' + cake.time + ':00+01:00').getTime().toString();
    return this.http.post<Cake>(`${this.url}/cakes`, cake)
      .subscribe(
        data => this.createCakeSource.next(data),
        err => console.log(err)
      );
  }

  updateCake(cake: Cake) {
    this.loadingSource.next(true);
    // TODO - only save unix time in mongo
    // cake.timestamp = new Date(cake.date + 'T' + cake.time + ':00+01:00').getTime().toString();
    // cake.date = new Date(cake.date + 'T' + cake.time + ':00+01:00').getTime().toString();
    return this.http.put<Cake>(`${this.url}/cakes`, cake)
      .subscribe(
        data => this.updateCakeSource.next(data),
        err => console.log(err)
      );
  }

  deleteCake(cake: Cake) {
    this.loadingSource.next(true);
    return this.http.delete<Cake>(`${this.url}/cakes/${cake._id}`)
      .subscribe(
        data => this.deleteCakeSource.next(data),
        err => console.log(err)
      );
  }

  likeCake(cake: Cake) {
    return this.http.post<Cake>(`${this.url}/cakes/like`, cake)
      .subscribe(
        data => this.updateCakeSource.next(data),
        err => console.log(err)
      );
  }

  getHighscores() {
    this.loadingSource.next(true);
    return this.http.get<Highscore[]>(`${this.url}/highscores`);
  }

  loading(bool: boolean) {
    this.loadingSource.next(bool);
  }
}
