import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';

import { AlertController } from '@ionic/angular';
import { FirebaseProductService } from '../service/firebase-product.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {

  @Input() product!: Product;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private alertController: AlertController,
    private firebaseProduct: FirebaseProductService
  ) { }

  ngOnInit() { }

  cancel() {
    /** Close modal */
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
  redirectWithProductId(id: string) {
    this.router.navigate(['/tabs/tab2', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id: string) {
    this.presentAlert();
    this.firebaseProduct.delete(id);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Product Delected',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
