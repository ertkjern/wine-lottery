import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {LoginModel} from '../../shared/models/login.model';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private validationService: ValidationService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.setupForm();
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['profile']);
    }
  }

  private setupForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, this.validationService.emailValidator])],
      password: ['', Validators.required],
    });
  }

  login(loginForm: LoginModel) {
    this.auth.login(loginForm.email, loginForm.password).subscribe(result => {
      this.router.navigate(['profile']);
    }, error => {
      console.log(error);
    });
  }

  registerUser() {
    this.router.navigate(['register']);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
