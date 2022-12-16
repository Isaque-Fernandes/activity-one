import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../model/product.model';
import { Supplier } from '../model/supplier.model';
import { FirebaseProductService } from '../service/firebase-product.service';
import { FirebaseSupplierService } from '../service/firebase-supplier.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild('productFormDirective') productFormDirective!: FormGroupDirective;

  productForm!: FormGroup;
  product!: Product;

  suppliers: Supplier[] = [];

  notificationMessage !: string;
  editable: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebaseProduct: FirebaseProductService,
    private firebaseSupplier: FirebaseSupplierService
  ) { }

  public ionViewWillEnter() {
    this.list();
  }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      'productName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-z ]+$/)]),
      'quantity': new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+$/)]),
      'purchasePrice': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      'percentage': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      'salePrice': new FormControl('', [Validators.required]),
      'supplier': new FormGroup({
        'id': new FormControl('', []),
      })
    })


    this.activatedRoute.paramMap.subscribe(params => {
      const catchProductId = params.get('id')!;

      if (catchProductId) {
        this.firebaseProduct.find(catchProductId).subscribe({
          next: (rs) => {
            this.product = rs;
            this.editable = true;
            this.loadForm();
          },
          error: (err) => { console.error(err); }
        })
      };
    })

  }

  list(): void {
    this.firebaseSupplier.list().subscribe({
      next: (rs) => {
        this.suppliers = rs;

      },
      error: (err) => {
        console.error(err);
      },
    })
  }

  register(values: any): void {
    let product: Product = { ...values };

    let supplier: Supplier = { ...values };

    supplier = this.suppliers.filter(supplier => supplier.id == product.supplier.id)[0];

    product.supplier.corporateName = supplier.corporateName;

    this.firebaseProduct.save(product);
    this.productForm.reset();
    this.router.navigateByUrl('/tabs/tab3');
  }

  saleCalc(): void {
    let purchasePrice = this.productForm.get('purchasePrice')?.value;
    let percentage = this.productForm.get('percentage')?.value;

    let result = (purchasePrice + (purchasePrice * (percentage / 100))).toFixed(2);

    this.productForm.patchValue({
      salePrice: result
    })
  }


  loadForm() {
    this.productForm.patchValue({
      productName: this.product.productName,
      purchasePrice: this.product.purchasePrice,
      percentage: this.product.percentage,
      quantity: this.product.quantity,
      salePrice: this.product.salePrice,
    })

    this.productForm?.get('supplier')?.patchValue({
      id: this.product.supplier.id,
      corporateName: this.product.supplier.corporateName,
    })
  }

  update(values: any) {
    let product: Product = { ...values };
    product.id = this.product.id;

    const supplier = this.suppliers.filter(supplier => supplier.id == product.supplier.id)[0];

    product.supplier.corporateName = supplier.corporateName;

    this.firebaseProduct.update(product);

    this.productForm.reset();



    this.router.navigateByUrl('/tabs/tab3');

  }

}
