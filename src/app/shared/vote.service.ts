import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VotePayload } from './vote/vote-payload';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private voteCounts: Map<number, number> = new Map<number, number>();

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(
      environment.apiKey + '/vote/',
      votePayload,
      httpOptions);
  }

  updateVoteCount(postId: number, voteCount: number): void {
    this.voteCounts.set(postId, voteCount);
  }

  getVoteCount(postId: number): number | undefined {
    return this.voteCounts.get(postId);
  }
}
