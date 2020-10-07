//Npm imports
import { Injectable } from '@angular/core';

//ionic component imports
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CommonUtilitiesService {

  constructor(
    public loadingController: LoadingController
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
}
