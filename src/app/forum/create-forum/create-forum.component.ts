import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ForumModel } from '../forum-response';
import { Router } from '@angular/router';
import { ForumService } from '../forum.service';
import { throwError } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { WhiteSpaceValidator } from 'src/app/validators/whitespace.validator';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.css']
})
export class CreateForumComponent implements OnInit {
  createForumForm: FormGroup;
  forumModel: ForumModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private forumService: ForumService, public dialogRef: MatDialogRef<CreateForumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ForumModel) {
    this.createForumForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        WhiteSpaceValidator.noWhiteSpace,
        Validators.minLength(3),
        Validators.maxLength(30),

      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ])
    });
    this.forumModel = {
      name: '',
      description: ''
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

  createForum() {
    this.dialogRef.close();
    this.forumModel.name = this.createForumForm.get('title')?.value;
    this.forumModel.description = this.createForumForm.get('description')?.value ? this.createForumForm.get('description')?.value : '';
    this.forumModel.numberOfPosts = 0;
    this.forumService.createForum(this.forumModel).subscribe(data => {
      this.router.navigateByUrl('/forum/all');
    }, error => {
      throwError(error);
    })
  }
}
