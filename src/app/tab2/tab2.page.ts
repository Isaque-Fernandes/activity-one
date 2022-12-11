import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../service/product.service';

import { Product } from '../model/product.model';
import { Supplier } from '../model/supplier.model';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  productForm!: FormGroup;
  product!: Product;

  suppliers!: Supplier[];

  notificationMessage !: string;
  editable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.supplierService.list().subscribe({
      next: (rs) => {
        this.suppliers = rs;
      },
      error: (err) => {
        console.error(err);
      },
    })

    this.productForm = this.formBuilder.group({
      productName: ['', []],
      quantity: ['', []],
      purchasePrice: ['', []],
      percentage: ['', []],
      salePrice: ['', []],

      supplier: this.formBuilder.group({
        id: ['', []],
        corporateName: ['', []]
      })
    })

    this.activatedRoute.paramMap.subscribe(params => {
      const catchProductId = +params.get('id')!;

      if (catchProductId) {
        this.productService.find(catchProductId).subscribe({
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

  register(): void {
    const product = this.productForm.getRawValue() as Product;

    const supplier = this.productForm.getRawValue() as Supplier;
    
    product.supplier.corporateName = supplier.corporateName;

    this.productService.register(product).subscribe({
      next: () => {
        this.productForm.reset();

        this.router.navigateByUrl('/tabs/tab3');
      },
      error: (error: any) => { console.error(error); }
    })
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

  update() {
    const product = this.productForm.getRawValue() as Product;
    product.id = this.product.id;

    this.productService.update(product).subscribe({
      next: () => {
        this.router.navigateByUrl('/tabs/tab3');
        this.productForm.reset();
      },
      error: (err) => { console.error(err); this.productForm.reset() }
    })
  }

}
