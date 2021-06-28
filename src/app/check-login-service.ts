import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class CheckLoginService{

    private subject = new BehaviorSubject<boolean>(false);
    obs = this.subject as Observable<boolean>;

    Login(){
        this.subject.next(true);
    }

    Logout(){
        this.subject.next(false);
    }

}