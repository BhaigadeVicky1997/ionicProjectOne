//Angular Ionic imports
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilitiesService {

  constructor(
    public loadingController: LoadingController,
    public AlertController:AlertController
  ) { }

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      cssClass: 'Loading-class',
      message: msg,
      duration: 1000,
      animated: true
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert(msg) {
    const alert = await this.AlertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
