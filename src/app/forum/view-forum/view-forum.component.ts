import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { ForumModel } from '../forum-response';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit, OnDestroy {
  postsByForum: PostModel[] = [];
  page: number = 0;
  forumName: string;
  forum: ForumModel;
  isLoading: boolean = true;

  private routeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private forumService: ForumService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.forumName = params['name'];

      this.forumService.getForum(this.forumName).subscribe(
        (data: ForumModel) => {
          this.forum = data;
        },
        error => {
          catchError(error);
        }
      );

      this.postService
        .getAllPostsByForum(this.forumName, 0, 5, undefined, 'DESC')
        .subscribe(
          data => {
            this.postsByForum = data;
            this.isLoading = false;
          },
          error => {
            catchError(error);
          }
        );
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
