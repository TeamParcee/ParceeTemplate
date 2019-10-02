import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/helper.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private navCtrl: NavController,
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      this.firebaseUser = user;
    })
  }



  firebaseUser;
  checkEmailVerified() {
    if (firebase.auth().currentUser) {
      return this.firebaseUser.emailVerified;
    } else {
      return false;
    }

  }

  signinWithEmail(form) {
    firebase.auth().signInWithEmailAndPassword(form.email, form.password).catch((error) => {
      this.helperService.okAlert("Sign Error", error.message)
    }).then(() => {
      this.navCtrl.navigateForward("/home")
    })
  }

  createAccountWithEmail(form) {
    firebase.auth().createUserWithEmailAndPassword(form.email, form.password).then(() => {
      firebase.auth().currentUser.sendEmailVerification();
      firebase.auth().currentUser.updateProfile({
        displayName: form.fname + " " + form.lname,
        photoURL: ""
      }).then(() => {
        this.navCtrl.navigateForward("/confirm-email")
      })
    }).catch((error) => {
      this.helperService.okAlert("Error Creating Account", error.message)
    })
  }

  signout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.navigateBack("/auth")
    })
  }

  sendConfirmationEmail() {
    firebase.auth().currentUser.sendEmailVerification();
  }
  changeEmail(email) {
    return new Promise((resolve) => {
      firebase.auth().currentUser.updateEmail(email).then(() => {
        this.helperService.okAlert("Email Updated", "Your email address has been updated");
        return resolve(email);
      }).catch((error) => {
        this.helperService.okAlert("Error Updating Email", error.message)
      })
    })
  }

  sendPasswordReset(email){
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
        this.helperService.okAlert("Password Reset Email", "Password rest email has been sent")
      }).catch((error)=>{
        this.helperService.okAlert("Error Sending Password Reset Email", error.message)
      })
    
  }
}
