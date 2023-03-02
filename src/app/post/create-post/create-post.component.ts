import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ForumModel } from 'src/app/forum/forum-response';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { ForumService } from 'src/app/forum/forum.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';
import {v4 as uuidv4} from 'uuid';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  forums: Array<ForumModel>;

  constructor(private router: Router, private postService: PostService,
    private forumService: ForumService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      forumName: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      forumName: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
    this.forumService.getAllForums().subscribe((data) => {
      this.forums = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.forumName = this.createPostForm.get('forumName')?.value;
    this.postPayload.url = uuidv4();
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
