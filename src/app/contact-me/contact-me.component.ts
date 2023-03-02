import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent {

 contactForm: FormGroup;
 // TODO: implement send message
 //contactPayload: object;


  constructor(private router: Router, private _snackBar: MatSnackBar,) {
  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      contactName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  
  sendMessage() {
    this.openSnackBar();
    this.router.navigate(['/']);
    
  }

  openSnackBar(){
    this._snackBar.open("Message sent.", "Dismiss", {
      duration: 2000,
    });
  }
  

  discardPost() {
    this.router.navigateByUrl('/');
  }
}

