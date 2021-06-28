import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { interval, Observable, BehaviorSubject } from 'rxjs';
import { LeaderService } from '../leader.service';
import { Data } from '../Data';
import { CheckLoginService } from '../check-login-service';

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
  timer: any;
  loginObs :any;

  constructor(private service: LeaderService, public loginService : CheckLoginService) {
    this.loginObs = this.loginService.obs;
   }

  ngOnInit(): void {
    let randomNumber = this.generateRandomNumber();
    this.inputOne = randomNumber[0];
    this.inputTwo = randomNumber[1];
    this.progressBar = 0;
  }

  ngDoCheck() {
    if (this.progressBar > 110) {
      this.UpdateView();
    }
  }

  Start() {
    this.result = '';
    this.counter =0;
    this.total=0;
    this.appstarted.emit(true);
    this.started = true;
    this.stopped = false;
    this.progressBar = 0;
    this.SetTimer();
  }



  CheckResult(event: Event) {
    console.log();
    if (this.progressBar < 100) {
      this.result = (event.target as HTMLInputElement).value;
      if (parseInt(this.result) == (this.inputOne + this.inputTwo)) {
        this.resultClass = true;
        this.counter++;
        this.UpdateView();
      }
    }
  }

  UpdateView() {
    this.timer.unsubscribe();
    this.total++;
    this.result = '';
    let randomNumber = this.generateRandomNumber();
    this.inputOne = randomNumber[0];
    this.inputTwo = randomNumber[1];
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
    this.timer = interval(100).subscribe(x => {
      this.progressBar = x;
    });
  }

  EndGame() {
    this.started = false;
    this.progressBar = 0;
    this.timer.unsubscribe();
    this.stopped = true;
    this.appstarted.emit(false);
    this.UpdateToDB();
  }


  ngOnDestroy(): void {
    this.timer.unsubscribe();
  }

  UpdateToDB() {
    const user = "" + localStorage.getItem("USER");
    const userData = this.service.getUser(user);
    if (userData == null) {
      const newUserData: Data = {
        name: user,
        highestScore: this.counter,
        currentScore: this.counter
      };
      this.service.onUpdateData(newUserData);
    }
    else {
      const hScore = userData.highestScore;
      if (this.counter > hScore) {
        const newUserData: Data = {
          name: user,
          highestScore: this.counter,
          currentScore: this.counter
        };
        this.service.onUpdateData(newUserData);
      }
      else {
        const newUserData: Data = {
          name: user,
          highestScore: hScore,
          currentScore: this.counter
        };
        this.service.onUpdateData(newUserData);
      }
    }



  }

}
