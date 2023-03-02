import { Component, Input, OnInit } from '@angular/core';
import { ForumModel } from '../forum-response';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-forum-info',
  templateUrl: './forum-info.component.html',
  styleUrls: ['./forum-info.component.css']
})
export class ForumInfoComponent implements OnInit{
  @Input() forum: ForumModel;
  isReadMore: boolean = false;

  constructor(){

  }

  ngOnInit(){
  }

  checkDataLength(data:string) {
    this.isReadMore = (data.length > 60);
  }
}
