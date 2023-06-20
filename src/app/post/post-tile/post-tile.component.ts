import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../../shared/post-model';
import { PostService } from '../../shared/post.service';
import { ViewCountWebSocketService } from 'src/app/_services/view-count-web-socket.service';
@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {


  @Input() posts: PostModel[];
  page: number = 0;
  isReadMore: boolean = false;
  sortBy: string = "createdDate";
  postType: string = "post";

  constructor(private router: Router,
     private postService: PostService,
     private viewCountWebSocketService: ViewCountWebSocketService,
      ) {

   }

   ngOnInit(): void {
    this.viewCountWebSocketService.connect().subscribe((client) => {
      client.subscribe('/topic/viewCountUpdate', (message) => {
        const viewCountUpdate = JSON.parse(message.body);
        //console.log("viewCountUpdate is: " + JSON.stringify(viewCountUpdate));
        let updatedPost = this.posts.find(post => post.id === viewCountUpdate.postId);
        if(updatedPost){
          updatedPost.viewCount = viewCountUpdate.viewCount; 
        }        
      });
    });
  }
  

  
  onScroll():void{
    this.postService
    .getAllPosts(++this.page, 5, this.sortBy)
    .subscribe((posts: PostModel[]) =>{
      this.posts.push(...posts);
    });
  }

  checkDataLength(data:string) {
    this.isReadMore = (data.length > 60);
  }

  updateViewCount(post: PostModel) {
    this.viewCountWebSocketService.send(`/app/incrementViewCount/${post.id}`, {});
  }
  handleReadMoreClick(event: MouseEvent, post: PostModel) {
    event.stopPropagation();
    this.updateViewCount(post);
  }
  
}
