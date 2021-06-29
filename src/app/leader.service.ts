import { Injectable } from '@angular/core'
import { Data } from './DataService';
import { HttpserviceService } from './httpservice.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  leaderBoard : Data[] = [];  

  constructor(private loadService : HttpserviceService) { 
    this.loadService.GetAllUsers().subscribe(res=> this.leaderBoard = res);
  }
 
  onUpdateData(userData : Partial<Data>){
    const username = userData.name; 
    const currentdata = this.leaderBoard.find(x=> x.name == username);
    if(currentdata !=null){
      this.onUpdateExistingUserData(userData);
    }
    else{
      const cScore = userData.currentScore;
      const hScore = userData.currentScore;
      const userDataNew : Partial<Data> = {
      name : username,
      currentScore : cScore,
      highScore : hScore,
      }
      this.loadService.AddUser(userDataNew).subscribe(res=> console.log(res));
      this.loadService.GetAllUsers().pipe(tap(res=> console.log(res))).subscribe(res=> this.leaderBoard = res);
    }
    
    }

  onUpdateExistingUserData(userData :Partial<Data>){
    const username = userData.name;
    const currentdata = this.leaderBoard.find(x=> x.name == username);
    const cScore = userData.currentScore!;
    if(currentdata!=null){
      if(cScore > currentdata.highScore){
        currentdata.highScore =cScore;
        currentdata.currentScore = cScore;
        this.loadService.AddUserExisting(currentdata).subscribe(res=> console.log(res));
      }
    }
  }

  getUser(username : string){
    return this.leaderBoard.find(x=> x.name==username);
  }

}
