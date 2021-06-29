import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { interval, Observable, BehaviorSubject, timer } from 'rxjs';
import { LeaderService } from '../leader.service';
import { Data } from '../DataService';
import { CheckLoginService } from '../check-login-service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  counter$!: Observable<number>;
  count = 100;
  //progressBar: number = 0;
  total: number = 0;
  @Output() appstarted = new EventEmitter<boolean>();
  started: boolean = false;
  stopped: boolean = false;
  counter: number = 0;
  wcounter: number = 0;
  inputOne: number = 0;
  inputTwo: number = 0;
  result: string = '';
  checkLogin :boolean  = false;
  resultClass: boolean = true;
  operator: string[] = ['+', '-'];
  timer: any;
  time : number = 100;
  timeExceed : boolean = false;

  constructor(private service: LeaderService, public loginService : CheckLoginService) {
    
  }

  ngOnInit(): void {
    let randomNumber = this.generateRandomNumber();
    this.inputOne = randomNumber[0];
    this.inputTwo = randomNumber[1];
    this.checkLogin = this.loginService.LoggedIn();
  }

  ngDoCheck() {
    if (this.time<0) {
      this.timeExceed=true;
      this.EndGame();
    }
  }

  Start() {
    this.timeExceed=false;
    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
    this.timer = this.counter$.subscribe(res=> {
      this.time = res;
    });
    this.result = '';
    this.counter =0;
    this.total=1;
    this.appstarted.emit(true);
    this.started = true;
    this.stopped = false;
    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
    this.checkLogin = this.loginService.LoggedIn();
  }



  CheckResult(event: Event) {
    if (this.time > 0) {
      this.result = (event.target as HTMLInputElement).value;
      if (parseInt(this.result) == (this.inputOne + this.inputTwo)) {
        this.resultClass = true;
        this.counter++;
        this.UpdateView();
        console.log("correct...")
      }
    }
  }

  UpdateView() {
    this.total++;
    this.result = '';
    let randomNumber = this.generateRandomNumber();
    this.inputOne = randomNumber[0];
    this.inputTwo = randomNumber[1];
  }

  generateRandomNumber(): number[] {
    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;
    return [num1, num2];
  }


  EndGame() {
    this.started = false;
    this.timer.unsubscribe();
    this.stopped = true;
    this.appstarted.emit(false);
    this.checkLogin = this.loginService.LoggedIn();
    if(this.checkLogin){
     this.UpdateToDB();
    } 
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe();
  }

  UpdateToDB() {
    const user = "" + localStorage.getItem("USER");
      const newUserData: Partial<Data> = {
        name: user,
        currentScore: this.counter
      };
    this.service.onUpdateData(newUserData);
    
  }



}
