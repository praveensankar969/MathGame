import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../leader.service';
import { Data } from '../DataService';
import { HttpserviceService } from '../httpservice.service';

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
    this.leaderboard = this.service.leaderBoard;
  }





}
