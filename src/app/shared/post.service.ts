import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from './options-button/delete-dialog/delete-dialog.component';
import { EventBusService } from '../_shared/event-bus.service';

const post_url: string = environment.apiKey + "/post";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient, private dialog: MatDialog, private sharedService: EventBusService) { }

   openDeleteDialog(postId: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { postId };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // delete the post with the specified postId
        return this.http.delete(post_url + '/' + postId);
      } else {
        return;
      }
    });
  }

  //limit default is 5
  getAllPosts(page: number, limit?: number, sortBy?: string, direction?: string): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(post_url + '/all' + `?${page === undefined? '' : `page=${page}`}${limit === undefined? '' : `&limit=${limit}`}${sortBy === undefined? '' : `&sortBy=${sortBy}`}${direction === undefined? '' : `&direction=${direction}`}`);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(post_url,
      postPayload,
      httpOptions);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(post_url + '/' + id);
  }

  getAllPostsByUser(name: string, page: number, limit?: number, sortBy?: string, direction?: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(post_url + '/by-user/' + name + `?${page === undefined? '' : `page=${page}`}${limit === undefined? '' : `&limit=${limit}`}${sortBy === undefined? '' : `&sortBy=${sortBy}`}${direction === undefined? '' : `&direction=${direction}`}`);
  }

  getAllPostsByForum(forumName: string, page: number, limit?: number, sortBy?: string, direction?: string){
    return this.http.get<PostModel[]>(post_url + '/by-forum/' + forumName + `?${page === undefined? '' : `page=${page}`}${limit === undefined? '' : `&limit=${limit}`}${sortBy === undefined? '' : `&sortBy=${sortBy}`}${direction === undefined? '' : `&direction=${direction}`}`);
  }

  save(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(post_url + '/save',
    postPayload,
    httpOptions);
  }

  unsave(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(post_url + '/unsave',
    postPayload,
    httpOptions);
  }

  getSavedPosts(): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(post_url + '/saved');
  }

  delete(id: number) {
    return this.http.delete(post_url + '/' + id).subscribe(() => {
      this.sharedService.notifyPostDeleted();
    });
  }
}
