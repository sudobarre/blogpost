import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpRequestInterceptor } from './_helpers/http.interceptor';
import { ExceptionIntercept } from './_helpers/exception.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { bootstrapGithub, bootstrapLinkedin, bootstrapTelegram } from "@ng-icons/bootstrap-icons";
import { NgIconsModule } from '@ng-icons/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {ClipboardModule} from '@angular/cdk/clipboard'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateForumComponent } from './forum/create-forum/create-forum.component';
import { ListForumsComponent } from './forum/list-forums/list-forums.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { ForumSideBarComponent } from './shared/forum-side-bar/forum-side-bar.component';
import { ReadMoreComponent } from './shared/read-more/read-more.component';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { OptionsButtonComponent } from './shared/options-button/options-button.component';
import { PostDataFooterComponent } from './shared/post-data-footer/post-data-footer.component';
import { ViewForumComponent } from './forum/view-forum/view-forum.component';
import { CreateButtonsComponent } from './shared/create-buttons/create-buttons.component';
import { UserForumsComponent } from './forum/user-forums/user-forums.component';
import { ForumInfoComponent } from './forum/forum-info/forum-info.component';
import { DeleteDialogComponent } from './shared/options-button/delete-dialog/delete-dialog.component';
import { SavedPostsComponent } from './saved-posts/saved-posts.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { ReportDialogComponent } from './shared/report-dialog/report-dialog.component';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { RateLimitInterceptor } from './_helpers/rate-limit.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        SignupComponent,
        UserProfileComponent,
        CreateForumComponent,
        ListForumsComponent,
        CreatePostComponent,
        ViewPostComponent,
        PostTileComponent,
        ForumSideBarComponent,
        AuthComponent,
        ReadMoreComponent,
        FooterComponent,
        OptionsButtonComponent,
        PostDataFooterComponent,
        ViewForumComponent,
        CreateButtonsComponent,
        UserForumsComponent,
        ForumInfoComponent,
        DeleteDialogComponent,
        SavedPostsComponent,
        ContactMeComponent,
        ReportDialogComponent,
        ScrollTopComponent,
        SearchBarComponent,
        
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ExceptionIntercept,
            multi: true
        },
        {   provide: HTTP_INTERCEPTORS,
            useClass: RateLimitInterceptor,
            multi: true 
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        FontAwesomeModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatToolbarModule,
        MatTabsModule,
        MatMenuModule,
        InfiniteScrollModule,
        MatChipsModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatDividerModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        NgIconsModule.withIcons({bootstrapGithub, bootstrapLinkedin, bootstrapTelegram}),
        MatTooltipModule,
        ClipboardModule,
        MatSnackBarModule,
        
    ]
})
export class AppModule { }
