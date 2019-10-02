import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HelperService } from 'src/helper.service';
import { AlertInput } from '@ionic/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
})
export class ConfirmEmailPage implements OnInit {

  constructor(
    private authService: AuthService,
    private helper: HelperService,
    private router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.checkEmailVerified();
    }, 1000)
  }
  email = firebase.auth().currentUser.email;


  checkEmailVerified() {
    firebase.auth().currentUser.reload();
    if (firebase.auth().currentUser.emailVerified) {
      this.navCtrl.navigateForward("home")
    }
  }
  updateEmail() {
    this.email = firebase.auth().currentUser.email;
  }
  signout() {
    this.authService.signout();
  }

  resendEmail() {
    this.authService.sendConfirmationEmail();
    this.helper.okAlert("Confirmation Email Sent", "A confirmation email has been sent.");

  }

  changeEmail() {

    this.helper.inputAlert("New Email Address", "Enter your new email address", [{ name: "email", value: this.email }]).then((result: any) => {
      this.authService.changeEmail(result.email).then((email: any) => {
        this.email = email;
        this.resendEmail();
      })
      this.navCtrl.navigateRoot('/confirm-email');
    })
  }
}
