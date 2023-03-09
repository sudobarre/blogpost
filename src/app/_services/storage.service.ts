import { EventEmitter, Injectable, Output } from '@angular/core';
import { PostModel } from '../shared/post-model';

const USER_KEY = 'current-auth-user';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly SAVED_POSTS_KEY = "savedPosts";

  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  public getUsername(): any{
    return window.localStorage.getItem('username');
  }

  public getRoles(): string[]{
    let res:string[] = [];
    if(this.isLoggedIn()){
      let roles = window.localStorage.getItem('roles')!;
      res=roles.split(',');
    }
    return res;
  }



  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    return window.localStorage.getItem(USER_KEY) != null;
  }

  public set(key:string, value: any): void{
    return window.localStorage.setItem(key, value);
  }

  //TODO: get comments, forums, posts, favourites, etc
  public getSavedPosts(): PostModel[]{
    const savedPosts = window.localStorage.getItem(this.SAVED_POSTS_KEY);
    if (savedPosts) {
      try {
        return JSON.parse(savedPosts);
      } catch (error) {
        console.error('Error parsing saved posts:', error);
      }
    }
    return [];
  }

  public savePost(post: PostModel): void {
    const savedPosts = this.getSavedPosts();
    savedPosts.push(post);
    window.localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }

  public unsavePost(post: PostModel): void {
    let savedPosts = this.getSavedPosts();
    savedPosts = savedPosts.filter(p => p.id !== post.id);
    window.localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }
}
