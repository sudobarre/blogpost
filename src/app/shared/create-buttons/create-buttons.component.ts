import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CreateForumComponent } from 'src/app/forum/create-forum/create-forum.component';


@Component({
  selector: 'app-create-buttons',
  templateUrl: './create-buttons.component.html',
  styleUrls: ['./create-buttons.component.css']
})
export class CreateButtonsComponent {
  title: string ='';
  description: string = '';

  constructor(private router: Router, public dialog: MatDialog) { }

   openCreateForumDialog(): void {
    const dialogRef = this.dialog.open(CreateForumComponent, {
      data: {
        title: this.title,
        description: this.description
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngOnInit() {
  }

}

