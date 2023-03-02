import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted: Boolean = false;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string = '';
  isError: boolean = false;
  hide: boolean = true;
  errorMessage: String = '';
  isLoggedIn : boolean = false;
  roles: string[] = []

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder,  private storageService: StorageService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    //TODO: add loading spinner

     if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    //if coming from successful signup
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params['registered'] !== undefined && params['registered'] === 'true') {
          this.registerSuccessMessage = 'Please check your inbox for activation email.';
          this.toastr.success( this.registerSuccessMessage, 'Signup Successful');
        }
      });
  }

  onLogin() {
    this.submitted = true;
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.roles = this.storageService.getUser().roles;
        this.isError = false;
        this.isLoggedIn = true;
        this.router.navigateByUrl('');
        
        this.toastr.success('Login Successful');
        
    },
     error: err => {
      this.isError = true;
      this.errorMessage = err.error.message;
      //console.log(this.errorMessage);
    }
  });
}

  reloadPage(): void {
    window.location.reload();
  }
}
