import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalSupplierComponent } from './modal-supplier.component';

@NgModule({
  declarations: [ModalSupplierComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ModalSupplierComponent]
})
export class ModalSupplierModule { }
