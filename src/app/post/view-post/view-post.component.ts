import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { StorageService } from 'src/app/_services/storage.service';
import { ForumService } from 'src/app/forum/forum.service';
import { ForumModel } from 'src/app/forum/forum-response';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  postType: string = 'post';

  forum: ForumModel;
  forumName: string;

  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];

  page: number = 0;

  isLoading: boolean = false;

  postMarkdown: string = '';
  @Input() commentText: string;

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private router: Router,
    private storageService: StorageService,
    private forumService: ForumService,
    ) {
    this.postId = this.activateRoute.snapshot.params['id'];

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId,
    };

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCommentsFromPost();
    this.postService.getPost(this.postId)
      .pipe(
        switchMap(post => {
          this.post = post;
          this.postMarkdown = this.post.description;
          return this.forumService.getForum(this.post.forumName);
        })
      )
      .subscribe((data: ForumModel) => {
        this.forum = data;
        this.isLoading = false;
      }, error => {
        catchError(error);
      });

      

  }

  postComment() {
    if(this.storageService.isLoggedIn()){
      this.commentPayload.userName = this.storageService.getUsername();
      let text = this.commentForm.get('text')?.value;      
      this.commentPayload.text = text;
      this.commentService.postComment(this.commentPayload).subscribe(data => {
        this.commentForm.get('text')?.setValue('');
        this.getCommentsFromPost();
        //gotta reload for the new comment to show up, else on scroll it wont fetch it,
        //since it just gets the first page of comments.
        window.location.reload();
      }, error => {
        throwError(error);
      })
    } else {
      this.router.navigate(['login']);
      return;
    }
  }


  private getCommentsFromPost() {
    this.commentService.getAllCommentsFromPost(this.postId, 0, 25).subscribe(data => {
      this.comments = data;      
    }, error => {
      throwError(error);
    });
  }

  public goToForum(forumName: string){
    this.router.navigate(['/forum/' + forumName]);
  }

   onScroll():void{
    this.commentService
    .getAllCommentsFromPost(this.postId, ++this.page, 10)
    .subscribe((comments: CommentPayload[]) =>{
      this.comments.push(...comments);
    });
  }
}
