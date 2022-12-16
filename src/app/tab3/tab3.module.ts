import { Tab3Page } from './tab3.page';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalProductModule } from '../modal-product/modal-product.module';
import { HttpClientModule } from '@angular/common/http';

import { CorreiosService } from '../service/correios.service';
import { ProductService } from '../service/product.service';
import { SupplierService } from '../service/supplier.service';
import { FirebaseProductService } from '../service/firebase-product.service';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,

    HttpClientModule,
    ModalProductModule
  ],
  declarations: [Tab3Page],
  providers: [CorreiosService, ProductService, SupplierService, FirebaseProductService]
})
export class Tab3PageModule {}
