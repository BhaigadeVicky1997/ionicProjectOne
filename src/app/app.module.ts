//Npm Ionic imports 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';

//Local imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonUtilitiesService } from '../app/shared/common-utilities.service';
import { environment } from '../environments/environment';

//reactive Form module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//firebase 
import * as firebase from 'firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
firebase.initializeApp(environment.firebase)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonUtilitiesService,
    Camera,
    { provide: [RouteReuseStrategy], useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
