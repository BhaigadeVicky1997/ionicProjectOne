import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  //variable declarations
  service = [];
 
  constructor() { }

  ngOnInit() {
    this.getAllServices();
  }

getAllServices(){
  firebase.firestore().collection("services").get()
  .then(doc => {
    doc.forEach((docsData) => {
      this.service.push(docsData)
    })
  })
  .catch(err => {
    console.log(err);
  })
}

}
