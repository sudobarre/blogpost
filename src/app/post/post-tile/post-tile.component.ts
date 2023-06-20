import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../../shared/post-model';
import { PostService } from '../../shared/post.service';
import { WebSocketService } from 'src/app/_services/websocket.service';
import { Subscription, catchError } from 'rxjs';
@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  @Input() sortBy: string = "createdDate";
  //optional, only if u want specific posts from target (currently only "forum" or "saved")
  @Input() target: string = "";
  //i hate this
  @Input() forumName: string = "";

  posts: PostModel[] = [];
  page: number = 0;
  isReadMore: boolean = false;
  isLoading: boolean = true;
  private postSubscription: Subscription;


  constructor(private router: Router,
     private postService: PostService,
     private webSocketService: WebSocketService,
      ) {

   }

   ngOnInit(): void {
    this.fetchPosts(this.sortBy, this.target);
      //websocket
      this.webSocketService.connect().subscribe((client) => {
        client.subscribe('/topic/viewCountUpdate', (message) => {
          const viewCountUpdate = JSON.parse(message.body);
          //console.log("viewCountUpdate is: " + JSON.stringify(viewCountUpdate));
          let updatedPost = this.posts.find(post => post.id === viewCountUpdate.postId);
          if(updatedPost){
            updatedPost.viewCount = viewCountUpdate.viewCount; 
          }        
        });

        this.postSubscription = this.webSocketService.subscribeToPostDeleted().subscribe((postId: number) => {
          this.handlePostDeleted(postId);
        });
        this.webSocketService.subscribeToPostCreated().subscribe((post: PostModel) => {
          this.handlePostCreated(post);
        });
        
      });
      this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  fetchPosts(sortBy: string = "createdDate", target: string = "", page: number = 0): void{
    switch(target){
      case 'saved':
        this.postService.getSavedPosts().subscribe((posts: PostModel[]) =>{
          this.posts.push(...posts);
        });
        return;
        break;
      case 'forum':
        if(this.forumName != ""){
          this.postService
            .getAllPostsByForum(this.forumName, page, 15, undefined, 'ASC')
            .subscribe((posts: PostModel[]) =>{
              this.posts.push(...posts);
            });
        };
        return;
        break;
      default:
        this.postService
        .getAllPosts(page, 15, this.sortBy)
        .subscribe((posts: PostModel[]) =>{
          this.posts.push(...posts);
        });
        break;
    }
  }

  
  onScroll():void{
    this.getPostPage();
  }

  getPostPage(): void {
    this.fetchPosts(this.sortBy, this.target, ++this.page);
  }

  checkDataLength(data:string) {
    this.isReadMore = (data.length > 60);
  }

  updateViewCount(postId: number) {
    this.webSocketService.updateViewCount(postId);
  }
  handleReadMoreClick(event: MouseEvent, postId: number) {
    event.stopPropagation();
    this.updateViewCount(postId);
  }

  handlePostDeleted(postId: number): void {
    this.posts = this.posts.filter(post => post.id !== postId);
  }

  handlePostCreated(post: PostModel): void{
    if(this.sortBy === "createdDate"){
      this.posts.unshift(post);
    } else {
      this.posts.push(post);
    }
    
  }
  
}
