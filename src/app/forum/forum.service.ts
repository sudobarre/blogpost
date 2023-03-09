import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, mergeMap, shareReplay, tap } from 'rxjs';
import { ForumModel } from './forum-response';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  constructor(private http: HttpClient) { }

  apiUrl:string = environment.apiKey + "/forum";

  private _forumsData$ = new BehaviorSubject<void>(undefined);

  apiRequest$ = this.http.get<Array<ForumModel>>(this.apiUrl + '/all');

  public forums$ = this._forumsData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1)
  );

  getAllForums(page?: number, limit?: number, sortBy?: string, direction?: string): Observable<Array<ForumModel>> {    
    return this.http.get<Array<ForumModel>>(this.apiUrl + '/all' + `?${page === undefined? '' : `page=${page}`}${limit === undefined? '' : `&limit=${limit}`}${sortBy === undefined? '' : `&sortBy=${sortBy}`}${direction === undefined? '' : `&direction=${direction}`}`).pipe(
      tap(() => this._forumsData$.next())
    );
  }

  getAllForumsByUsername(username: String, page?: number, limit?: number, sortBy?: string, direction?: string) : Observable<Array<ForumModel>> {
    return this.http.get<Array<ForumModel>>(this.apiUrl + '/by-user/' + username + `?${page === undefined? '' : `page=${page}`}${limit === undefined? '' : `&limit=${limit}`}${sortBy === undefined? '' : `&sortBy=${sortBy}`}${direction === undefined? '' : `&direction=${direction}`}`).pipe(
      tap(() => this._forumsData$.next())
    );
  }

  createForum(forumModel: ForumModel): Observable<ForumModel> {
    return this.http.post<ForumModel>(
      this.apiUrl,
      forumModel,
      httpOptions).pipe(
        tap(() => this._forumsData$.next())
      );
  }

  //TODO in the backend
  editForum(forumModel: ForumModel): Observable<ForumModel> {
    return this.http.put<ForumModel>(this.apiUrl, forumModel).pipe(
      tap(() => this._forumsData$.next())
    );
  }

  deleteForum(forumId: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/${forumId}`).pipe(
      tap(() => this._forumsData$.next())
    );
  }

  getForum(forumName: string): Observable<ForumModel> {
    return this.http.get<ForumModel>(this.apiUrl + `/${forumName}`);
  }
}
