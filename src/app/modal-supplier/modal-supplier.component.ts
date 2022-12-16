import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Supplier } from '../model/supplier.model';
import { FirebaseSupplierService } from '../service/firebase-supplier.service';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-modal-supplier',
  templateUrl: './modal-supplier.component.html',
  styleUrls: ['./modal-supplier.component.scss'],
})
export class ModalSupplierComponent implements OnInit {

  @Input() supplier!: Supplier;

  constructor(
    private modalCtrl: ModalController,
    private supplierService: SupplierService,
    private router: Router,
    private alertController: AlertController,
    private firebaseService: FirebaseSupplierService
  ) { }

  ngOnInit() { }

  cancel() {
    /** Close modal */
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  redirectWithSupplierId(id: string) {
    this.router.navigate(['/tabs/tab4', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id: string) {
    this.presentAlert();
    this.firebaseService.delete(id);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Supplier Delected',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
