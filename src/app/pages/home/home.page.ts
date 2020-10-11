//npm ionic imports
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;

  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;


  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };

  constructor(private activatedRoute: ActivatedRoute,private todoService: FirebaseServiceService,private utilities:CommonUtilitiesService
  ) {
    //Item object for Nature
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 995
        },
        {
          id: 925
        },
        {
          id: 940
        },
        {
          id: 943
        },
        {
          id: 944
        }
      ]
    };
    //Item object for Food
    this.sliderTwo =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 324
        },
        {
          id: 321
        },
        {
          id: 435
        },
        {
          id: 524
        },
        {
          id: 235
        }
      ]
    };
    //Item object for Fashion
    this.sliderThree =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 643
        },
        {
          id: 532
        },
        {
          id: 232
        },
        {
          id: 874
        },
        {
          id: 193
        }
      ]
    };
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
  todos;
  public folder: string;
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.homeServicesFetch();
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
