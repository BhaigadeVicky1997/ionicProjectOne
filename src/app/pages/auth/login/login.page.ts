import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController,NavController, AlertController  } from '@ionic/angular';

//firebase import 
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Variable Declaration's
  email;
  pass;
  constructor(public AlertController: AlertController,public NavController:NavController,public Router:Router,public ToastController:ToastController) { }

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
  login() {
    if (this.email == undefined || this.pass == undefined) {
      this.presentAlert('Please fill all fields.')
    }
    else{
      firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
      .then(res => {
        console.log(res);
        this.presentAlert('Login Success!');
        this.NavController.navigateRoot('/login');
      })
      .catch(err => {
        console.log(err.message);
        this.presentAlert(err.message);
      })
    }
  }
}
