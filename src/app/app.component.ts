import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MathGame';
  start : boolean = false;

  appStarted(started : boolean){
    this.start =!this.start;
  }
}
