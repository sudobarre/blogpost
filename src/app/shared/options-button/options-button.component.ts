import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { CreatePostPayload } from 'src/app/post/create-post/create-post.payload';
import { StorageService } from 'src/app/_services/storage.service';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { ForumService } from 'src/app/forum/forum.service';
@Component({
  selector: 'app-options-button',
  templateUrl: './options-button.component.html',
  styleUrls: ['./options-button.component.css']
})
export class OptionsButtonComponent implements OnInit{
    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  //could be a post or a comment.
  @Input() toDelete: any;
  @Input() isForum: boolean;
  @Input() name: string;

  isPost: boolean;
  isStarred: boolean;
  isFollowed: boolean;

  userRoles: string[] = [];
  username:string;
  savedPosts: PostModel[] = [];
  isLoggedIn: boolean;

  //for the report reason
  description: string = '';


  constructor(private postService: PostService,
    private commentService: CommentService,
    private dialog: MatDialog,
    private localStorage: StorageService,
    private router: Router,
    private forumService: ForumService
    ) {}

  ngOnInit(): void {
    this.isPost = (this.name=="post");
    this.isLoggedIn = this.localStorage.isLoggedIn();
    //This is wrong, cos its making a request on every init of the options button, which is every single post.
    //it should be making one request per page view, instead its making
    //number of posts requests, regardless whether they are saved or not.

    //Consider adding it to the cache db, or cache on client-side (when its ready), or
    //Having a sort of Output where this component just polls it every time.
    //The output would update its savedPosts value every time a post was saved/unsaved.
    if(this.isLoggedIn){
      if(this.name == "post"){
        this.postService.getSavedPosts().subscribe(
          (data: PostModel[]) => {
            this.savedPosts = data;
            this.isStarred = this.containsObject(this.toDelete,this.savedPosts);
          }
        )
      };
    this.userRoles = this.localStorage.getRoles();
    this.username = this.localStorage.getUsername();
    //TODO: call forumService to check if the forum is followed by the user
    this.isFollowed = false;
    }
  }

  containsObject(obj: any, list: any) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
            return true;
        }
    }
    return false;
}

 openDeleteDialog(toDelete: any, name: string): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { toDelete, name };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      switch(name){
        case "comment":
          return this.deleteComment(toDelete.id);
        case "post":
          return this.deletePost(toDelete.id);
        case "forum":
          return this.deleteForum(toDelete.id);
        default:
          break;
      }
    }
    });
  }

  openReportDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      data: {
        description: this.description
      },
    });
    //maybe add a snackbar or sth
    dialogRef.afterClosed().subscribe(result => {
    });
  }




  deletePost(postId: number) {
    //delete service alredy subscribes and notifies
    this.postService.delete(postId);
    this.router.navigate(['/']);
    //notify user that it has been deleted.
  }


  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(
      sth => {
        window.location.reload();
        //notify user that it has been deleted.
      }
    );
  }

  deleteForum(id: number){
    this.forumService.deleteForum(id).subscribe(
      sth => {
        this.router.navigate(['/']);
      }
    );
    //notify user that it has been deleted.
  }

  //have to update the updated value before creating another request
  star(post: PostModel){
    let postRequest: CreatePostPayload = new CreatePostPayload;
    postRequest.username = post.userName;
    postRequest.description = post.description;
    postRequest.forumName = post.forumName;
    postRequest.postName = post.title;
    postRequest.url = post.url;
    if (!this.isStarred) {
      this.isStarred = true;
      this.postService.save(postRequest).subscribe();
    } else {
      //if post is already starred then unstar it
      this.isStarred = false;
      this.postService.unsave(postRequest).subscribe();
    }
  }


  canDelete(): boolean{
    //either the owner or an admin or mod can delete it.
    //TODO: check for the response on forum model, it doesnt currently have an author.
    if(this.name=="forum"){
      if(!(this.userRoles.length > 2)){
        return false;
      }
      return true;
    }
    return ((this.toDelete.userName == this.username) || this.userRoles.length > 1);
  }

  //TODO
  follow(forum: any){
    //call forumService to follow the forum
  }
}
