import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalProductComponent } from './modal-product.component';

@NgModule({
  declarations: [ModalProductComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ModalProductComponent]
})
export class ModalProductModule { }
