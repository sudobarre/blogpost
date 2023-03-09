import { Component, Input } from '@angular/core';
import { ForumModel } from '../forum-response';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-user-forums',
  templateUrl: './user-forums.component.html',
  styleUrls: ['./user-forums.component.css']
})
export class UserForumsComponent {
  @Input() username: string;
  userForums: Array<ForumModel>;
  panelOpenState = false;

  constructor(private forumService: ForumService){

  }
  ngOnInit(){
this.forumService.getAllForumsByUsername(this.username, 0, 25).subscribe(
      (data: Array<ForumModel>) => {
        this.userForums = data;
      }
    )
  }
}
