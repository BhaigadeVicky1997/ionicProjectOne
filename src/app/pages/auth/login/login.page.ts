//Angular Ionic Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, AlertController } from '@ionic/angular';

//Local Imports
import { CommonUtilitiesService } from 'src/app/shared/common-utilities.service';

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
  constructor(
    public AlertController: AlertController,
    public NavController: NavController,
    public Router: Router,
    public ToastController: ToastController,
    public CommonUtilitiesService: CommonUtilitiesService
  ) { }

  ngOnInit() {
  }

  
  login() {
    if (this.email == undefined || this.pass == undefined) {
      this.CommonUtilitiesService.presentAlert('Please fill all fields.')
    }
    else {
      firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
        .then(res => {
          console.log(res);
          this.CommonUtilitiesService.presentAlert('Login Success!');
          setTimeout(() => {
            this.Router.navigate(['/home']);
          }, 2000)
        })
        .catch(err => {
          console.log(err.message);
          this.CommonUtilitiesService.presentAlert(err.message);
        })
    }
  }
}
