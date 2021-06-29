import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { Data } from './DataService';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http : HttpClient) {
  }

  GetAllUsers() : Observable<Data[]>{
    console.log("Fetching new data....");
    const res = this.http.get<Data[]>("https://backendgameapi.azurewebsites.net/api/Game");
    return res;
  }

  AddUser(data : Partial<Data>){
    console.log("Adding new user.....");
    return this.http.post("https://backendgameapi.azurewebsites.net/api/Game", data);
  }

  AddUserExisting(data : Data){
    console.log("Updating score.....");
    return this.http.patch("https://backendgameapi.azurewebsites.net/api/Game/"+data.name, data);
  }



}
