import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {

  @Input() product!: Product;

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  cancel() {
    /** Close modal */
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
  redirectWithProductId(id: number) {
    this.router.navigate(['/tabs/tab2', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id: number) {
    this.presentAlert()
    this.productService.delete(id).subscribe({
      next: () => { this.modalCtrl.dismiss(null, 'cancel'); },
      error: (err) => { console.error(err); }
    })
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
