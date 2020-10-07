//npm ionic imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';

//firebase imports
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { CommonUtilitiesService } from 'src/app/shared/common-utilities.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  todos;
  public folder: string;
  constructor(private activatedRoute: ActivatedRoute,private todoService: FirebaseServiceService,private utilities:CommonUtilitiesService) { }
 
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.homeServicesFetch();
  }

  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  ngAfterViewInit(): void {
  }
   

  homeServicesFetch(){
    this.utilities.presentLoading('Please Wait......');
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
      console.log(this.todos);
    },err=>{
    this.utilities.presentLoading('Please Wait......');
    });
  }


}
