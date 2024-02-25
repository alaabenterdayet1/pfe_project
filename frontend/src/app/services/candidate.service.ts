import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Candidate from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  /*getCandidates(): Observable<any[]> {
    // Replace this with your actual API call to fetch candidates
    const candidates = [
      { name: 'Candidate 1' },
      { name: 'Candidate 2' },
      // Add more candidates as needed
    ];

    return of(candidates);
  }*/
  baseURL: string = "http://localhost:3000/registerEvents"; // Replace with your actual API URL

  constructor(private _http: HttpClient) { }

  
  getCandidates(eventId: string): Observable<any[]> {
    return this._http.get<any[]>(this.baseURL + '/' + eventId);
  }

  addCandidate(candidate: Candidate) {
    return this._http.post(this.baseURL, candidate);
  }

  modifyCandidate(candidate: Candidate){
    return this._http.put(this.baseURL, candidate);
  }
  deleteCandidate(candidateID: string){
    return this._http.delete(this.baseURL + '/' + candidateID);
  }
}
