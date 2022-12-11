import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ProductService } from '../service/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Tab1PageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [Tab1Page],
  providers: [ProductService]
})

export class Tab1PageModule { }
