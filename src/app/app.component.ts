import { Component } from '@angular/core';
import { CheckLoginService } from './check-login-service';
import { LeaderService } from './leader.service';
import { HttpserviceService } from './httpservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MathGame';
  clicked : boolean = false;
  start : boolean = false;
  username : string = '';
  participate : boolean = false;
  participatebtn : boolean = true;
  loggedin :boolean = false;
  joinedLeague : boolean = false;

  constructor(private service : CheckLoginService, private httpservice : LeaderService){
    console.log("Game started");
    
    if(localStorage.getItem("USER")!= null){
      this.username = "" + localStorage.getItem("USER");
      this.participate = true;
      this.participatebtn = false;
      this.service.Login();
      this.loggedin =  this.service.LoggedIn();
      this.joinedLeague = true;
    }
    else{
      this.username = '';
    } 
  }

  appStarted(started : boolean){
    this.start =!this.start;
  }
  OnClick(){
    this.clicked = !this.clicked;
  }
  OnClickParticipate(username : string){
    this.username = username;
    this.participate =true;
    this.participatebtn = false;
    this.service.Login();
    this.loggedin = this.service.LoggedIn();
    
  }
  SignOut(){
    this.service.Logout();
    this.loggedin = this.service.LoggedIn();
    this.participate = false;
    this.participatebtn = true;
    this.joinedLeague =false;
    this.username = '';
    localStorage.removeItem('USER');
    
  }
  AddUser(){
    this.participate =false;
    this.username = this.username.split(' ').join('');
    localStorage.setItem('USER', this.username);
    this.joinedLeague =true;
    console.log(localStorage.getItem('USER'));
  }
  
}
