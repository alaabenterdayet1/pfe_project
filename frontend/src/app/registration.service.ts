// registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from './models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:3000/registerEvents';

  constructor(private http: HttpClient) {}

  registerForEvent(eventId: string, user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}`, { user });
  }

  getUsersForEvent(eventId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${eventId}/users`);
  }
}
