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
  @Input() isPost: boolean;
  @Input() isForum: boolean;

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
    this.isLoggedIn = this.localStorage.isLoggedIn();
    if(this.isLoggedIn){
      this.postService.getSavedPosts().subscribe(
        (data: PostModel[]) => {
          this.savedPosts = data;
          if(this.isPost){
            this.isStarred = this.containsObject(this.toDelete,this.savedPosts);
          }
        }
      );
    this.userRoles = this.localStorage.getRoles();
    this.username = this.localStorage.getUsername();
    //call forumService to check if the forum is followed by the user
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

 openDeleteDialog(toDelete: any, isPost: boolean): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { toDelete, isPost };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(this.isForum){
          return this.deleteForum(toDelete.id);
        }
        if (isPost) {
          this.deletePost(toDelete.id);
        } else {
          this.deleteComment(toDelete.id);
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
  }


  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(
      sth => {
        window.location.reload();
      }
    );
  }

  deleteForum(id: number){
    //delete from forum service
    this.router.navigate(['/']);
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
    return ((this.toDelete.userName == this.username) || this.userRoles.length > 1);
  }


  follow(forum: any){
    //call forumService to follow the forum
  }
}
