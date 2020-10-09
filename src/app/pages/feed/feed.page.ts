//Angular Import
import { Component } from '@angular/core';

//firebase import 
import * as firebase from 'firebase';

import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { CommonUtilitiesService } from 'src/app/shared/common-utilities.service';

import * as moment from 'moment';

import { LoadingController } from '@ionic/angular';

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
  pageSize:number = 10;
  private todosCollection: AngularFirestoreCollection;
  data: any;
 cursor:any;
  constructor(private FirebaseServiceService: FirebaseServiceService, db: AngularFirestore, private utilities: CommonUtilitiesService,public LoadingController:LoadingController) {

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPost();

  }

  // firebase.firestore().collection('posts').get()
  // .then((docs)=>{
  //   docs.forEach((doc)=>{
  //     this.posts.push(doc);
  //     console.log(this.posts);
  //   })
  // })
  // .catch((err)=>{
  //   console.log(err);
  // })


  //Api Integration 
  
  getPost() {

    this.posts = [];
    
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
  loadMorePosts(event){
  
    firebase.firestore().collection("posts").orderBy("created", 'desc').startAfter(this.cursor)
    .limit(this.pageSize).get()
      .then(doc => {
        doc.forEach((docsData) => {
          this.posts.push(docsData)
        })

        let u = firebase.auth().currentUser;
        this.name = u.displayName;
        console.log(this.posts);
        if(doc.size < this.pageSize){
              event.enable(false);
        }
        else{
          event.complete();
          this.cursor = this.posts[this.posts.length - 1];
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  sendPost() {
    if(this.postData == ''){
       
      this.utilities.presentLoading('Please Enter Something');
    }
    else{
      this.utilities.presentLoading('Loading New Blog....');
    
      firebase.firestore().collection("posts").add({
        postText: this.postData,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        owner: firebase.auth().currentUser.uid,
        owner_name: firebase.auth().currentUser.displayName
      })
        .then(doc => {
          console.log(doc);
          this.postData = "";
          this.getPost();
        })
        .catch(err => {
          console.log(err);
        }) 
    }
  }

ago(time){
let difference  = moment(time).diff(moment());
return moment.duration(difference).humanize();
}

}

