//Angular Ionic Import
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {  NavController } from '@ionic/angular';
//firebase import 
import * as firebase from 'firebase';
import { CommonUtilitiesService } from 'src/app/shared/common-utilities.service';
import * as moment from 'moment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})

export class FeedPage {

  //Variable Declaration
  postData: string = "";
  posts: any = [];
  name;
  pageSize: number = 10;
  data: any;
  cursor: any;
  infinite: any;
  image:string;
  
  constructor(
    private camera: Camera,
    public  NavController: NavController,
    private utilities: CommonUtilitiesService) { }

  ngOnInit() {
    this.getPost();
    

  }
  


  //Api Integration 

  logOut() {
    firebase.auth().signOut();
    this.utilities.presentLoading('You Have Been Logged Out!');
    this.NavController.navigateBack('/login');
  }

  getPost() {
    this.posts = [];
    this.utilities.presentLoading('Loading......');
    firebase.firestore().collection("posts").orderBy("created", 'desc').limit(this.pageSize).get()
      .then(doc => {
        doc.forEach((docsData) => {
          this.posts.push(docsData)
        })
        let u = firebase.auth().currentUser;
        this.name = u.displayName;
        console.log(this.posts);
        this.cursor = this.posts[this.posts.length - 1];
      })
      .catch(err => {
        console.log(err);
      })
  }

  sendPost() {
    if (this.postData == '') {
      this.utilities.presentLoading('Please Enter Something');
    }
    else {
      firebase.firestore().collection("posts").add({
        postText: this.postData,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        owner: firebase.auth().currentUser.uid,
        owner_name: firebase.auth().currentUser.displayName
      })
        .then(async  doc => {
          console.log(doc);
          
          if (this.image) {
            await this.upload(doc.id)
          }
          this.postData = "";
          this.image = undefined;

      this.utilities.presentLoading('New Blog Added');
      setTimeout(() =>{
        this.getPost();
      },2000)
     
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

//Ionic utilities for the loading and refresing content

  loadMorePosts(event) {
    firebase.firestore().collection("posts").orderBy("created", 'desc').startAfter(this.cursor)
      .limit(this.pageSize).get()
      .then(doc => {
        doc.forEach((docsData) => {
          this.posts.push(docsData)
        })
        let u = firebase.auth().currentUser;
        this.name = u.displayName;
        console.log(this.posts);
        if (doc.size < this.pageSize) {
          event.target.enable = false;
          this.infinite = event;
        }
        else {
          event.complete();
          this.cursor = this.posts[this.posts.length - 1];
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  doRefresh(event) {
    this.posts = [];
    this.getPost();

    if (this.infinite) {

      this.infinite.enable = true;
    }
    event.target.complete();
  }

  //get the human redable timestamp of the post

  ago(time) {
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }

//Cameara native Operation 1. Add Pic 2. LauchCamera 3. Upload

  addPhoto() {

    this.launchCamera();

  }

  launchCamera() {
    let options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 512,
      targetWidth: 512,
      allowEdit: false,
      correctOrientation:true
    }
    this.camera.getPicture(options).then((base64Image) => {
      console.log(base64Image);
      this.image = "data:image/png;base64," + base64Image;
    }).catch((err) => {
      console.log(err)
    })
  }

  upload(name: string) {

    return new Promise((resolve, reject) => {
      let ref = firebase.storage().ref("postImages/" + name);
      let uploadTask = ref.putString(this.image.split(',')[1], "base64");
      uploadTask.on("state_changed", (taskSnapshot: any) => {
        console.log(taskSnapshot)
        let percentage = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100;
        //this.utilities.presentAlert("Uploaded " + percentage + "% ...");
      }, (error) => {
        console.log(error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {

          firebase.firestore().collection("posts").doc(name).update({
            image: url
          }).then(() => {
            console.log('Done');
            this.utilities.presentAlert("The upload is complete!");
            resolve()
          }).catch((err) => {
            this.utilities.presentAlert(err);
            reject()
          })

        }).catch((err) => {
          this.utilities.presentAlert(err);
          reject()
        })

      })

    })

  } 
  
}

