import { Component, OnInit} from '@angular/core';
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
export class HomeComponent implements OnInit {

  page: number = 0;
  postsByForum: Array<PostModel> = [];
  postsByVotes: Array<PostModel> = [];
  postsByDate: Array<PostModel> = [];
  subbedForums: Array<ForumModel> = [];
  isLoggedIn : boolean = false;
  username : string | undefined;
  isLoading : boolean = true;
  private postDeletedSub: Subscription;

  constructor(private postService: PostService,
    private forumService: ForumService,
    private localStorage: StorageService,
    private sharedService: EventBusService
    ) {

    this.isLoggedIn = localStorage.isLoggedIn();
    this.username = localStorage.getUsername();
  }

  getAllPosts(): Observable<Array<PostModel[]>> {
  const postByDate$ = this.postService.getAllPosts(this.page, undefined, "postId", "DESC");
  const postByVotes$ = this.postService.getAllPosts(this.page, undefined, "voteCount", "DESC");

  return forkJoin([postByDate$, postByVotes$]).pipe(
    map(([postsByDate, postsByVotes]) => {
      return [postsByDate, postsByVotes];
    })
  );
}

  ngOnInit(): void {
    this.getAllPosts().subscribe(posts => {
      this.postsByDate= posts[0];
      this.postsByVotes = posts[1];
      this.isLoading = false;
    });
    this.retrievePosts("voteCount");


  this.postDeletedSub = this.sharedService.postDeleted$.subscribe(() => {
    this.refreshPosts("voteCount");
    this.refreshPosts("postId");
  });

    //TODO: Posts for user on followed forums

  }

  refreshPosts(sort: string) {
  this.postService.getAllPosts(this.page, undefined, sort)
    .subscribe((posts: PostModel[]) => {
      if (sort === "voteCount") {
        this.postsByVotes = posts;
      } else {
        this.postsByDate = posts;
      }
    });
}

  retrievePosts(sort: string){
    return this.postService.getAllPosts(this.page, undefined, sort).pipe(catchError(error => {
      console.error(error);
      return of([]);
    }))
    .subscribe((post: PostModel[]) => {
      return post;
    });
  }

   ngOnDestroy() {
    this.postDeletedSub.unsubscribe();
  }

}

