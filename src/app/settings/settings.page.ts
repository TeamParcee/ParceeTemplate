import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';
import { HelperService } from 'src/helper.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authService: AuthService,
    private helper: HelperService,
  ) { }

  itemSelected;
  user;
  ngOnInit() {
  }


  ionViewDidEnter() {
    this.getUser();
  }
  selectOption(option) {
    if (option == this.itemSelected) {
      this.itemSelected = false
    } else {
      this.itemSelected = option
    }
  }

  getUser() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    })
  }

  editName() {
    let fname = this.user.displayName.split(" ")[0];
    let lname = this.user.displayName.split(" ")[1];
    this.helper.inputAlert("Update Name", "Please enter your First and Last Name", [{ name: "fname", value: fname, placeholder: "First Name" }, { name: "lname", value: lname, placeholder: "Last Name" }])
      .then((result: any) => {
        firebase.auth().currentUser.updateProfile({
          displayName: result.fname + " " + result.lname,
          photoURL: this.user.photoURL
        })
      })
  }

  editEmail() {
    this.helper.inputAlert("Update Email", "Please enter your Email Address", [{ name: "email", placeholder: "Email Address", value: this.user.email }])
      .then((result: any) => {
        firebase.auth().currentUser.updateEmail(result.email).catch((error) => {
          this.helper.okAlert("Email Not Changed", error.message)
        })
      })

  }
}
