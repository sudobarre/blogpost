import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../auth/auth.service';
import { WhiteSpaceValidator } from '../validators/whitespace.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  hide: boolean = true;
  isError: boolean = false;
  errorMessage:string = '';


  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: '',
      //user is added by default on the backend but for clarity and to match the dto.
      role: ["user"],
    };
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      confirmPassword:  new FormControl(''),
    }, {validator: this.passwordMatchValidator})
  }

  passwordMatchValidator(g: FormGroup) {
   return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
}

  getUsernameErrorMessage(){
    if(this.signupForm.get('username')?.hasError('required')){
      return "User name is required."
    }
     if(this.signupForm.get('username')?.hasError('minlength')){
      return "User name has to be more than 3 characters long."
    }
     if(this.signupForm.get('username')?.hasError('maxlength')){
      return "User name has to be less than 20 characters long."
    }
    if(this.signupForm.get('username')?.hasError('noWhiteSpace')){
      return "User name can't contain spaces."
    }
    return 'User name is invalid.';
  }


  getPasswordErrorMessage(){
    if(this.signupForm.get('password')?.hasError('required')){
      return "Password is required."
    }
     if(this.signupForm.get('password')?.hasError('minlength')){
      return "Password has to be more than 6 characters long."
    }
     if(this.signupForm.get('password')?.hasError('maxlength')){
      return "Password has to be less than 30 characters long."
    }
    return 'Password is invalid.';
  }

  onSignup() {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    //role is user by default
    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['signup'],
          { queryParams: { registered: 'true' } });
      }, error => {
        console.error(error);
        this.isError = true;
      });
  }
}
