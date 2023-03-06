import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class CommentService {

  api: string = environment.apiKey + '/comments';

  constructor(private httpClient: HttpClient) { }

  getAllCommentsFromPost(postId: number, page?: number, limit?: number, sortBy?: string, direction?: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(this.api + '/by-post/' + postId + `?${page === undefined? '' : `page=${page}`}&${limit === undefined? '' : `limit=${limit}`}&${sortBy === undefined? '' : `sortBy=${sortBy}`}&${direction === undefined? '' : `direction=${direction}`}`);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(
      this.api,
      commentPayload,
      httpOptions);
  }

  getAllCommentsByUser(name: string, page?: number, limit?: number, sortBy?: string, direction?: string): Observable<CommentPayload[]>  {
    return this.httpClient.get<CommentPayload[]>(this.api + '/by-user/' + name+ `?${page === undefined? '' : `page=${page}`}&${limit === undefined? '' : `limit=${limit}`}&${sortBy === undefined? '' : `sortBy=${sortBy}`}&${direction === undefined? '' : `direction=${direction}`}`);
  }

  deleteComment(id: number): Observable<any> {
    return this.httpClient.delete(this.api + `/${id}`);
  }

  editComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.put<any>( this.api + '/edit', commentPayload);
  }
}
