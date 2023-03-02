import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { AuthComponent } from './auth/auth.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { CreateForumComponent } from './forum/create-forum/create-forum.component';
import { ListForumsComponent } from './forum/list-forums/list-forums.component';
import { ViewForumComponent } from './forum/view-forum/view-forum.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { SavedPostsComponent } from './saved-posts/saved-posts.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/create', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: ViewPostComponent },
  { path: 'forum/all', component: ListForumsComponent },
  { path: 'forum/:name', component: ViewForumComponent},
  { path: 'user/:name/starred', component: SavedPostsComponent, canActivate: [AuthGuard] },
  { path: 'user/:name', component: UserProfileComponent },
  { path: 'login', component: AuthComponent },
  { path: 'signup', component: AuthComponent },
  { path: 'contact', component: ContactMeComponent },
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
