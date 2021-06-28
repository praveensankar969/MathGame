import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  progressBar: number = 0;
  total: number = 0;
  @Output() appstarted = new EventEmitter<boolean>();
  started: boolean = false;
  stopped: boolean = false;
  counter: number = 0;
  wcounter: number = 0;
  inputOne: number = 0;
  inputTwo: number = 0;
  result: string = '';
  resultClass: boolean = true;
  operator: string[] = ['+', '-'];
  obs: any;

  constructor() { }

  ngOnInit(): void {
    let randomNumber = this.generateRandomNumber();
    this.inputOne = randomNumber[0];
    this.inputTwo = randomNumber[1];
    this.progressBar = 0;
  }

  Start() {
    this.appstarted.emit(true);
    this.started = true;
    this.stopped = false;
    this.progressBar = 0;
    this.SetTimer();
  }

  CheckResult(event: Event) {
    this.total++;
    if (this.progressBar < 100) {
      this.result = (event.target as HTMLInputElement).value;
      if (parseInt(this.result) == (this.inputOne + this.inputTwo)) {
        this.resultClass = true;
        this.counter++;
        this.result = '';
      }
    }

    else {
      this.resultClass = false;
      this.result = '';
    }
    this.result = '';
    let randomNumber = this.generateRandomNumber();
    this.inputOne = randomNumber[0];
    this.inputTwo = randomNumber[1];
    this.obs.unsubscribe();
    this.progressBar = 0;
    this.SetTimer();
  }

  generateRandomNumber(): number[] {
    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;
    return [num1, num2];
  }


  SetTimer() {
    this.progressBar = 0;
    this.obs = interval(100).subscribe(x => this.progressBar = x);
    return this.progressBar;
  }

  EndGame() {
    this.started = false;
    this.progressBar = 0;
    this.obs.unsubscribe();
    this.stopped = true;
    this.appstarted.emit(false);
  }

  Console(){
    console.log("Clicked");
  }

  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }

}
