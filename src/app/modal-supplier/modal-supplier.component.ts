import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Supplier } from '../model/supplier.model';
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
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  cancel() {
    /** Close modal */
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
  redirectWithSupplierId(id: number) {
    this.router.navigate(['/tabs/tab4', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id: number) {
    this.presentAlert()
    this.supplierService.delete(id).subscribe({
      next: () => { this.modalCtrl.dismiss(null, 'cancel'); },
      error: (err) => { console.error(err); }
    })
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
