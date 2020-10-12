import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleServicePage } from './single-service.page';

describe('SingleServicePage', () => {
  let component: SingleServicePage;
  let fixture: ComponentFixture<SingleServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
