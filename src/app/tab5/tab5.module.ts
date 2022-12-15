import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { Tab5Page } from './tab5.page';
import { CorreiosService } from '../service/correios.service';
import { SupplierService } from '../service/supplier.service';
import { ModalSupplierModule } from '../modal-supplier/modal-supplier.module';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseSupplierService } from '../service/firebase-supplier.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5PageRoutingModule,

    HttpClientModule,
    ModalSupplierModule
  ],
  declarations: [Tab5Page],
  providers: [CorreiosService, SupplierService, FirebaseSupplierService]
})
export class Tab5PageModule {}
