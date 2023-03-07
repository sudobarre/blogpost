import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { VotePayload } from '../vote-button/vote-payload';
import { VoteType } from '../vote-button/vote-type';
import { VoteService } from '../vote.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-data-footer',
  templateUrl: './post-data-footer.component.html',
  styleUrls: ['./post-data-footer.component.css']
})
export class PostDataFooterComponent {

  @Input() post: PostModel;
  votePayload: VotePayload;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;
  url= new URL(window.location.href);
  link: string = '';

  constructor(private router: Router,
    private voteService: VoteService,
    private postService: PostService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
    ){
       this.votePayload = {
        voteType: undefined,
        postId: undefined
      }
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }
  ngOnInit(): void {
    this.updateVoteDetails();
    
    this.url = new URL(`/blogpost/post/${this.post.id}`, this.url.origin);
    this.link = this.url.href;
  }



  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

  openSnackBar(){
    this._snackBar.open("Link copied to clipboard.", "Dismiss", {
      duration: 1500,
    });
  }
}
