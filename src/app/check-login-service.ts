import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class CheckLoginService{

   loggedIn : boolean = false;

   LoggedIn(){
       if(this.loggedIn){
           return true;
       }
       else{
           return false;
       }
   }

   Login(){
       this.loggedIn = true;
   }

   Logout(){
       this.loggedIn = false;
   }

}