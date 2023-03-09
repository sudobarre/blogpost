import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { Router } from '@angular/router';
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
      ) {

   }

  ngOnInit(): void {

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
}
