//Angular/Ionic Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

//firebase import 
import * as firebase from 'firebase';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  //Variable Declaration's
  email: any;
  password: any;
  cPass: any;
  name: any;

  constructor(public AlertController: AlertController, public Router: Router) { }

  ngOnInit() {
  }
  async presentAlert(error) {
    const alert = await this.AlertController.create({
      message: error,
      cssClass: 'alertHeader',
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  signin() {

    if (this.email == undefined || this.password == undefined) {
      this.presentAlert('Please fill all fields.')
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(async result => {
          console.log(result);
          let newUser: firebase.User = result.user;
          newUser.updateProfile({
            displayName: this.name,
            photoURL: ""
          })
            .then((re) => {
              console.log(re);
              this.presentAlert(this.name + ' Successfully Signin');
              this.Router.navigate(['/login']);
            })
        })
        .catch(err => {
          console.log(err.message);
          this.presentAlert(err.message);
        });
    }
  }
}
