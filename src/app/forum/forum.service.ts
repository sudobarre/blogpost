import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForumModel } from './forum-response'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  constructor(private http: HttpClient) { }

  apiUrl:string = environment.apiKey + "/forum";

  getAllForums(page?: number, limit?: number, sortBy?: string, direction?: string): Observable<Array<ForumModel>> {    
    return this.http.get<Array<ForumModel>>(this.apiUrl + '/all' + `?${page === undefined? '' : `page=${page}`}${limit === undefined? '' : `&limit=${limit}`}${sortBy === undefined? '' : `&sortBy=${sortBy}`}${direction === undefined? '' : `&direction=${direction}`}`);
  }

  getAllForumsByUsername(username: String, page?: number, limit?: number, sortBy?: string, direction?: string) : Observable<Array<ForumModel>> {
    return this.http.get<Array<ForumModel>>(this.apiUrl + '/by-user/' + username + `?${page === undefined? '' : `page=${page}`}${limit === undefined? '' : `&limit=${limit}`}${sortBy === undefined? '' : `&sortBy=${sortBy}`}${direction === undefined? '' : `&direction=${direction}`}`);
  }

  createForum(forumModel: ForumModel): Observable<ForumModel> {
    return this.http.post<ForumModel>(this.apiUrl, forumModel);
  }

  editForum(forumModel: ForumModel): Observable<ForumModel> {
    return this.http.put<ForumModel>(this.apiUrl, forumModel);
  }

  deleteForum(forumId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + forumId);
  }

  getForum(forumName: string): Observable<ForumModel> {
    return this.http.get<ForumModel>(this.apiUrl + `/${forumName}`);
  }
}
