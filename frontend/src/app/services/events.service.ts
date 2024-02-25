import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Evennement from '../models/evennement.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  baseURL:string = "http://localhost:3000/events";
  constructor(private _http:HttpClient) { }

  getAllEvents(){
    return this._http.get(this.baseURL);
  }
  addEvent(event:Evennement){
    return this._http.post(this.baseURL,event);
  }
  modifyEvent(event:Evennement){
    return this._http.put(this.baseURL,event);
  }
  deleteEvent(id:string){
    return this._http.delete(this.baseURL+"/"+id);
  }
}
