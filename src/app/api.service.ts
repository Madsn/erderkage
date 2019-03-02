import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';
import {Cake} from './cakes/cakes.component';

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
    console.log('createCake(): ' + cake.initials);
    console.log('createCake(): ' + cake.cake);
    console.log('createCake(): ' + cake.date);
    this.loadingSource.next(true);
    return this.http.post<Cake>(`${this.url}/cakes`, cake)
      .subscribe(
        data => this.createCakeSource.next(data),
        err => console.log(err)
      );
  }

  updateCake(cake: Cake) {
    this.loadingSource.next(true);
    return this.http.put<Cake>(`${this.url}/cakes`, cake)
      .subscribe(
        data => this.updateCakeSource.next(data),
        err => console.log(err)
      );
  }

  deleteCake(cake: Cake) {
    this.loadingSource.next(true);
    return this.http.delete<Cake>(`${this.url}/cakes/${cake.id}`)
      .subscribe(
        data => this.deleteCakeSource.next(data),
        err => console.log(err)
      );
  }

  loading(bool: boolean) {
    this.loadingSource.next(bool);
  }
}
