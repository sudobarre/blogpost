//this component shows 1 single comment received from the input.

import { Component, Input } from '@angular/core';
import { CommentPayload } from '../comment.payload';

@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.css']
})
export class ShowCommentComponent {
  @Input() comment: CommentPayload;
  commentType: string = 'comment';
  commentMarkdown: string = '';

  constructor(){

  }

  ngOnInit(){
    this.commentMarkdown = this.comment.text;
     
  }



}
