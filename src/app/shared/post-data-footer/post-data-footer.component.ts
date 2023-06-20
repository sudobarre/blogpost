import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { PostModel } from '../post-model';
import { VoteService } from '../vote.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/_services/storage.service';
import { VotePayload } from '../vote/vote-payload';
import { VoteType } from '../vote/vote-type';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-post-data-footer',
  templateUrl: './post-data-footer.component.html',
  styleUrls: ['./post-data-footer.component.css']
})
export class PostDataFooterComponent {

  @Input() post: PostModel;
  votePayload: VotePayload;
  isLoggedIn: boolean;
  url= new URL(window.location.href);
  link: string = '';
  hasVoted: boolean;

  constructor(
    private router: Router,
    private voteService: VoteService,
    private _snackBar: MatSnackBar,
    private storage: StorageService,
    ){
       this.votePayload = {
        voteType: undefined,
        postId: undefined
      }
      //websocket?
      this.isLoggedIn = this.storage.isLoggedIn();
    }
    ngOnInit(): void {

    this.hasVoted = (this.post.downVote || this.post.upVote);
    //when a post gets created, the mapper assigns false to upVote and downVote in the backend.  
    this.url = new URL(`/blogpost/post/${this.post.id}`, this.url.origin);
    this.link = this.url.href;
    // websocket?
   
  }

  upvotePost() {
    if(!this.isLoggedIn) return;
    if(this.post.upVote || this.votePayload.voteType == VoteType.UPVOTE){      
      return;
    }
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  
  }

  downvotePost() {
    if(!this.isLoggedIn) return;
    if(this.post.downVote || this.votePayload.voteType == VoteType.DOWNVOTE){
      return;
    }
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    
  }

  private vote() {
    if(!this.isLoggedIn) return;
    this.votePayload.postId = this.post.id;
    let isUpvoted =  (this.votePayload.voteType == VoteType.UPVOTE);
    this.post.upVote = isUpvoted;
    this.post.downVote = !isUpvoted;

    //if user has previously voted the opposite, it should add/substract 2.
    if(this.hasVoted){
      if(this.post.downVote){
        this.post.voteCount-=2;
      } else {
        this.post.voteCount+=2;
      }
    } else {
      //first time voting on the post, should add/substract 1.
      //doing the ternary conditional didnt work for some reason
      //some reason probably being me not knowing how to
      if(isUpvoted){
        this.post.voteCount++;  
      } else {
        this.post.voteCount--;  
      }
      this.hasVoted = true;      
    }
    this.voteService.vote(this.votePayload).subscribe(
      (response: any) => {
        const updatedVoteCount = response.voteCount;
        this.voteService.updateVoteCount(this.post.id, updatedVoteCount);
        this.post.voteCount = updatedVoteCount;
        this.post.upVote = isUpvoted;
        this.post.downVote = !isUpvoted;
        this.hasVoted = true;
        //websocket?
    }, error => {
      catchError(error);
    }); 
  }
  
  openSnackBar(){
    this._snackBar.open("Link copied to clipboard.", "Dismiss", {
      duration: 1500,
    });
  }
}
