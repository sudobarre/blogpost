import { Component, OnDestroy, OnInit} from '@angular/core';
import { of, Subscription,forkJoin, Observable } from 'rxjs';
import { ForumModel } from '../forum/forum-response';
import { ForumService } from '../forum/forum.service';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  page: number = 0;
  postsByForum: Array<PostModel> = [];
  postsByVotes: Array<PostModel> = [];
  postsByDate: Array<PostModel> = [];
  subbedForums: Array<ForumModel> = [];
  isLoggedIn: boolean = false;
  username: string | undefined;
  isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private localStorage: StorageService
    ) {

    this.isLoggedIn = localStorage.isLoggedIn();
    this.username = localStorage.getUsername();
  }

  ngOnInit(): void {
    /*
    this.getAllPosts().subscribe(posts => {
      this.postsByDate = posts[0];
      this.postsByVotes = posts[1];
      this.isLoading = false;
    });
    

    
    //TODO: Posts for user on followed forums

    */

  }

  getAllPosts(): Observable<Array<PostModel[]>> {
    const postByDate$ = this.postService.getAllPosts(this.page, 15, "postId", "DESC");
    const postByVotes$ = this.postService.getAllPosts(this.page, 15, "voteCount", "DESC");

    return forkJoin([postByDate$, postByVotes$]).pipe(
      map(([postsByDate, postsByVotes]) => {
        return [postsByDate, postsByVotes];
      })
    );
  }

  ngOnDestroy() {

  }
}