//Angular Import
import { Component } from '@angular/core';

//firebase import 
import * as firebase from 'firebase';

import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {

  //Variable Declaration
  postData: string = "";
  posts: any ;
  constructor(private FirebaseServiceService:FirebaseServiceService) { 
    this.FirebaseServiceService.getTodos().subscribe(res => {
      this.posts = res;
      console.log(this.posts);
    });
  }
  
  ionViewDidLoad(){
    this.getPost();
  } 
  //Api Integration 
  getPost() {
    firebase.firestore().collection("posts").get()
      .then(doc => {
        doc.forEach((docsData) => {
          this.posts.push(docsData)
        })
        console.log(this.posts);
      })
      .catch(err => {
        console.log(err);
      })
  }

  sendPost() {
    firebase.firestore().collection("posts").add({
      postText: this.postData,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: firebase.auth().currentUser.uid
    })
      .then(doc => {
        console.log(doc);
      })
      .catch(err => {
        console.log(err);
      })
  }

}
