import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ValidationService} from '../../shared/services/validation.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {LoginModel} from '../../shared/models/login.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private validationService: ValidationService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, this.validationService.emailValidator])],
      password: ['', Validators.required],
    });
  }

  register(registerForm: LoginModel) {
    this.auth.register(registerForm.email, registerForm.password).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.router.navigate(['login']);
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

}
