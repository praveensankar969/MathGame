import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../leader.service';
import { Data } from '../Data';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard : Data[] = [];
  header : string[] = ["Name", "Highscore"]
 
  constructor(private service : LeaderService) {
    
   }
  
  ngOnInit(): void {
    this.leaderboard = this.service.getHighestScoreSorted();
    this.leaderboard.sort((user1, user2)=> user1.highestScore > user2.highestScore ? 1 : user1.highestScore<user2.highestScore ? -1 :0 );
  }





}
