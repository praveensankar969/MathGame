import { Injectable } from '@angular/core'
import { Data } from './Data';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  leaderboard : Data[] = [{
      name : "Bot",
      currentScore :1,
      highestScore :1
    }
  ];
  

  onUpdateData(userData : Data){
    const username = userData.name;
    const currentdata = this.leaderboard.find(x=> x.name == username);
    const cScore = userData.currentScore;
    const hScore = userData.highestScore;
    if(currentdata ==null){
      const userData : Data = {
      name : username,
      currentScore : cScore,
      highestScore : hScore,
      }
      this.leaderboard.push(userData);
    } 
    else{
      currentdata.currentScore = cScore;
      currentdata.highestScore =cScore;
    }
  }


  getHighestScoreSorted(){
    return this.leaderboard;
  }

  getUser(username : string){
    return this.leaderboard.find(x=> x.name==username);
  }

}
