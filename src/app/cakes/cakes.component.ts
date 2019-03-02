import { Component, OnInit } from '@angular/core';

export interface CakeElement {
  initials: string;
  cake: string;
  date: string;
  time: string;
}

const ELEMENT_DATA: CakeElement[] = [
  {initials: 'jsta', cake: 'Chokoladekage', date: '4.3.2019', time: '10:00'}
];

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['initials', 'cake', 'date', 'time'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
  }

}
