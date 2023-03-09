import { Component, OnInit } from '@angular/core';
import { ForumModel } from '../forum-response';
import { ForumService } from '../forum.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-list-forums',
  templateUrl: './list-forums.component.html',
  styleUrls: ['./list-forums.component.css']
})
export class ListForumsComponent implements OnInit {

  forums: Array<ForumModel> = [];
  constructor(private forumService: ForumService) {     
  }

  ngOnInit() {    
    //consider adding an infinite scroll once reached 200 forums, will never happen tho lol
    this.forumService.getAllForums(0, 200).subscribe(data => {
      this.forums = data;
    }, error => {
      catchError(error);
    })
  }
}
