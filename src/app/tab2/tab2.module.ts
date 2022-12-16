import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { HttpClientModule } from '@angular/common/http';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { CorreiosService } from '../service/correios.service';
import { ProductService } from '../service/product.service';
import { SupplierService } from '../service/supplier.service';
import { FirebaseProductService } from '../service/firebase-product.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [Tab2Page],
  providers: [CorreiosService, ProductService, SupplierService, FirebaseProductService]
})
export class Tab2PageModule {}
