import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleServicePageRoutingModule } from './single-service-routing.module';

import { SingleServicePage } from './single-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleServicePageRoutingModule
  ],
  declarations: [SingleServicePage]
})
export class SingleServicePageModule {}
