import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../comment/comment.service';
import { ForumService } from '../forum/forum.service';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.css']
})
export class SavedPostsComponent implements OnInit{

  username: string;
  savedPosts: PostModel[] = [];
  isLoading: boolean = true;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router, private storageService: StorageService, private forumService: ForumService) {
      this.username = this.activateRoute.snapshot.params['name'];
    }

    ngOnInit(){
      if(this.storageService.getUsername() != this.username){
        this.router.navigate(['/']);
        return;
      }
      this.postService.getSavedPosts().subscribe(
      (data: PostModel[]) => {
        this.savedPosts = data;
        this.isLoading = false;
      }
    );
  }



}
