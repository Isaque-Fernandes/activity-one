import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalSupplierComponent } from '../modal-supplier/modal-supplier.component';
import { Supplier } from '../model/supplier.model';
import { FirebaseSupplierService } from '../service/firebase-supplier.service';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {

  suppliers !: Supplier[];

  constructor(
    private supplierService: SupplierService,
    private modalCtrl: ModalController,
    private firebase: FirebaseSupplierService
  ) { }

  public ionViewWillEnter(): void {
    this.list();
  }

  list() {
    this.firebase.list().subscribe({
      next: (rs) => {
        this.suppliers = rs;
      },
      error: (err) => { console.error(err) },
    });
  }

  async openModal(id: string) {
    const supplier = this.suppliers.filter(supplier => supplier.id == id)[0];

    const modal = await this.modalCtrl.create({
      /** Create a component */
      component: ModalSupplierComponent,

      /** Create a property */
      componentProps: {
        'supplier': supplier
      }
    })

    /* Catch an event and transform its data type */
    modal.onWillDismiss().then(
      event => {
        if (event.role == 'cancel') {
          this.list();
        }
      }
    )

    /** Show modal */
    return await modal.present();
  }

}
