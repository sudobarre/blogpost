import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/forum/forum.service';

@Component({
  selector: 'app-forum-side-bar',
  templateUrl: './forum-side-bar.component.html',
  styleUrls: ['./forum-side-bar.component.css']
})
export class ForumSideBarComponent implements OnInit {
 
  constructor(private forumService: ForumService) {

  }

  ngOnInit(): void {
   }
}
