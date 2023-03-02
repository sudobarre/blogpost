import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../_services/storage.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { PostService } from '../shared/post.service';
import { ForumService } from '../forum/forum.service';
import { ForumModel } from '../forum/forum-response';


@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  searchControl = new FormControl();

  isLoggedIn?: boolean
  username: string;

  searchTerm: string = '';

  forums: ForumModel[] = [];
  filteredForums: Observable<ForumModel[]>;

  opened= false;

  constructor(private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private observer: BreakpointObserver,
    private postService: PostService,
    private forumService: ForumService,
    ) {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.username = this.storageService.getUsername();
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);

    this.forumService.getAllForums(0, 5).subscribe(forumList => {
      this.forums = forumList;

      this.filteredForums = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterForums(value))
      );
    });
  }

  private _filterForums(value: string) {
    if (!value) {
      return this.forums;
    }
    const filterValue = value.toLowerCase();

    return this.forums.filter(forum => {
      return forum.name.toLowerCase().includes(filterValue) ||
             forum.description.toLowerCase().includes(filterValue);
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.authService.logout().subscribe({
      next: (res: any) => {
        this.storageService.clean();
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    this.router.navigateByUrl('/login');
  }

  home(): void {
     this.router.navigate(['']);
  }
public onSidenavClose() {
  this.sidenav.close();
}



}

