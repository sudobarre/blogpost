import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { ForumModel } from '../forum-response';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit {
  postsByForum: PostModel[] = [];
  page: number = 0;
  forumName: string;
  forum: ForumModel;
  isLoading: boolean = true;

  constructor( private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private forumService: ForumService
    ){
      this.forumName = this.activatedRoute.snapshot.params['name'];
  }

  ngOnInit(){
    this.forumService.getForum(this.forumName). subscribe(
      (data: ForumModel) => {
        this.forum = data
      }, error => {
      catchError(error);
    });
     this.postService.getAllPostsByForum(this.forumName, 0, 5, undefined, 'DESC').subscribe(data => {
      this.postsByForum = data;
      this.isLoading = false;
    }, error => {
      catchError(error);
    });
  }
}
