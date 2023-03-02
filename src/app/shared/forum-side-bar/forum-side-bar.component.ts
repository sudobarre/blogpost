import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/forum/forum.service';
import { ForumModel } from 'src/app/forum/forum-response';

@Component({
  selector: 'app-forum-side-bar',
  templateUrl: './forum-side-bar.component.html',
  styleUrls: ['./forum-side-bar.component.css']
})
export class ForumSideBarComponent implements OnInit {
  forums: Array<ForumModel> = [];
  displayViewAll: boolean;
  isReadMore: boolean = false;

  constructor(private forumService: ForumService) {

  }

  ngOnInit(): void {
     this.forumService.getAllForums(0, 9).subscribe(data => {
      if (data.length > 8) {
        this.displayViewAll = true;
      }
      this.forums = data;
      this.isReadMore = (data.length > 60);
    });
   }
}
