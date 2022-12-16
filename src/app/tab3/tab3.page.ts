import { Component } from '@angular/core';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { ModalController } from '@ionic/angular';

import { Product } from '../model/product.model';
import { FirebaseProductService } from '../service/firebase-product.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  products !: Product[];

  constructor(
    private modalCtrl: ModalController,
    private firebaseProduct: FirebaseProductService
  ) { }

  public ionViewWillEnter(): void {
    this.list();
  }

  list() {
    this.firebaseProduct.list().subscribe({
      next: (rs) => { this.products = rs },
      error: (err) => { console.error(err) }
    })
  }

  async openModal(id: string) {
    const product = this.products.filter(product => product.id == id)[0];

    const modal = await this.modalCtrl.create({
      /** Create a component */
      component: ModalProductComponent,

      /** Create a property */
      componentProps: {
        'product': product
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
