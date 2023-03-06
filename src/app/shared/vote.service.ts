import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(
      environment.apiKey + '/vote/',
      votePayload,
      httpOptions);
  }
}
