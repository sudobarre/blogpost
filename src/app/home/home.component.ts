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
  private postDeletedSub: Subscription;
  private refreshPostsSub: Subscription;

  constructor(private postService: PostService,
    private localStorage: StorageService,
    private sharedService: EventBusService) {

    this.isLoggedIn = localStorage.isLoggedIn();
    this.username = localStorage.getUsername();
  }

  ngOnInit(): void {
    this.getAllPosts().subscribe(posts => {
      this.postsByDate = posts[0];
      this.postsByVotes = posts[1];
      this.isLoading = false;
    });
    this.retrievePosts("voteCount");

    this.postDeletedSub = this.sharedService.postDeleted$.subscribe(() => {
      this.refreshPostsSub = forkJoin([this.refreshPosts("voteCount"), this.refreshPosts("postId")]).subscribe((results: any[]) => {
        this.postsByVotes = results[0];
        this.postsByDate = results[1];
      });
    });

    //TODO: Posts for user on followed forums

  }

  refreshPosts(sort: string): Observable<PostModel[]> {
    return this.postService.getAllPosts(this.page, 15, sort).pipe(
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

  retrievePosts(sort: string) {
    this.postService.getAllPosts(this.page, 15, sort).subscribe((post: PostModel[]) => {
      if (sort === "voteCount") {
        this.postsByVotes = post;
      } else {
        this.postsByDate = post;
      }
    });
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
    this.postDeletedSub.unsubscribe();
    if (this.refreshPostsSub) {
      this.refreshPostsSub.unsubscribe();
    }
  }
}