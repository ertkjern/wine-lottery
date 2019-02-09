import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../shared/services/validation.service';
import {LoginModel} from '../shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private validationService: ValidationService) { }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, this.validationService.emailValidator])],
      password: ['', Validators.required],
    });
  }

  login(loginForm: LoginModel) {

  }

}
