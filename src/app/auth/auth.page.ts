import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  ngOnInit() {
  }


  showForgotPasswordEmailError;
  showRegisterEmailError;
  showRegisterPasswordError;
  showRegisterFnameError;
  showRegisterLnameError;
  showLoginEmailError;
  showLoginPasswordError;




  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,

  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    })
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })


  }


  firebaseUser = firebase.auth().currentUser;


  checkforgotPasswordEmail() {
    if (this.forgotPasswordForm.invalid) {
      this.showForgotPasswordEmailError = true;
    } else {
      this.showForgotPasswordEmailError = false;
    }
  }

  checkLoginEmail() {
    if (this.loginForm.controls["email"].invalid) {
      this.showLoginEmailError = true
    } else {
      this.showLoginEmailError = false;
    }
  }

  checkLoginPassword() {
    if (this.loginForm.controls["password"].invalid) {
      this.showLoginPasswordError = true
    } else {
      this.showLoginPasswordError = false;
    }
  }

  checkRegisterEmail() {
    if (this.registerForm.controls["email"].invalid) {
      this.showRegisterEmailError = true
    } else {
      this.showRegisterEmailError = false;
    }
  }

  checkRegisterPassword() {
    if (this.registerForm.controls["password"].invalid) {
      this.showRegisterPasswordError = true
    } else {
      this.showRegisterPasswordError = false;
    }
  }

  checkRegisterFname() {
    if (this.registerForm.controls["fname"].invalid) {
      this.showRegisterFnameError = true
    } else {
      this.showRegisterFnameError = false;
    }
  }

  checkRegisterLname() {
    if (this.registerForm.controls["lname"].invalid) {
      this.showRegisterLnameError = true
    } else {
      this.showRegisterLnameError = false;
    }
  }


  registerWithEmail(){
    this.authService.createAccountWithEmail(this.registerForm.value);
  }
  login(){
    this.authService.signinWithEmail(this.loginForm.value);
  }
  
  resetPassword(){
    this.authService.sendPasswordReset(this.forgotPasswordForm.controls["email"].value)
  }
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;





}
