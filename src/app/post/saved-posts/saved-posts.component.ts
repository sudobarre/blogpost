import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'ngx-webstorage/lib/core/interfaces/storageService';
import { CommentService } from 'src/app/comment/comment.service';
import { ForumService } from 'src/app/forum/forum.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';


@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit{

  username: string;
  savedPosts: PostModel[] = [];
  isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private router: Router,
    private forumService: ForumService
    ) {
      this.username = this.activateRoute.snapshot.params['name'];
    }

    ngOnInit(){
      this.postService.getSavedPosts().subscribe(
      (data: PostModel[]) => {
        this.savedPosts = data;
        this.isLoading = false;
      }
    );
  }



}
