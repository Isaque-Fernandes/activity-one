import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { CorreiosService } from '../service/correios.service';
import { SupplierService } from '../service/supplier.service';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseSupplierService } from '../service/firebase-supplier.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [Tab4Page],
  providers: [CorreiosService, SupplierService, FirebaseSupplierService]
})
export class Tab4PageModule {}
