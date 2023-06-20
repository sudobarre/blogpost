import { Component, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateForumComponent } from 'src/app/forum/create-forum/create-forum.component';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { StorageService } from 'src/app/_services/storage.service';
import { CreatePostPayload } from 'src/app/post/create-post/create-post.payload';
import {v4 as uuidv4} from 'uuid';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-dialog-create-post',
  templateUrl: './dialog-create-post.component.html',
  styleUrls: ['./dialog-create-post.component.css'],
  entryComponents: [DialogCreatePostComponent] 
})
export class DialogCreatePostComponent {

  createPostDialogForm: FormGroup;
  title = new FormControl('');
  description = new FormControl('');
  isLoggedIn: boolean = false;
  postPayload: CreatePostPayload;


  constructor(
    private router: Router,
    private postService: PostService,
    public dialogRef: MatDialogRef<CreateForumComponent>,
    private localStorage: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: PostModel
    ) {
      
    this.createPostDialogForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ]),
      description: new FormControl('', Validators.maxLength(4095))
    });
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      forumName: this.data.forumName
    }
    
}

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  discard() {
    this.dialogRef.close();
  }

  createPost() {
    this.dialogRef.close();
    this.postPayload.postName = this.createPostDialogForm.get('title')?.value;
    this.postPayload.description = this.createPostDialogForm.get('description')?.value ? this.createPostDialogForm.get('description')?.value : '';
    this.postPayload.forumName = this.data.forumName;
    this.postPayload.url = uuidv4();


    this.postService.createPost(this.postPayload).subscribe(data => {
      window.location.reload();
    }, error => {
      throwError(error);
    })
    
   //console.log(JSON.stringify(this.postPayload));
   
  }
}
