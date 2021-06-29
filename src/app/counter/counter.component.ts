import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter$: Observable<number>;
  count = 60;

   constructor() {
     this.counter$ = timer(0,1000).pipe(
       take(this.count),
       map(() => --this.count)
     );
   }

   ngOnInit(): void {
  }

}

