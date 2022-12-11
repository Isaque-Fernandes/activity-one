import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CorreiosService } from '../service/correios.service';
import { ProductService } from '../service/product.service';

import { Product } from '../model/product.model';
import { Address } from '../model/address.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  productForm!: FormGroup;
  product!: Product;

  notificationMessage !: string;
  editable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private correiosService: CorreiosService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', []],
      quantity: ['', []],
      purchasePrice: ['', []],
      percentage: ['', []],
      salePrice: ['', []],

      supplier: this.formBuilder.group({
        corporateName: ['', []],
        cnpj: ['', []],

        contact: this.formBuilder.group({
          email: ['', []],
          cellphone: ['', []],
        }),

        address: this.formBuilder.group({
          cep: ['', []],
          localidade: ['', []],
          uf: ['', []],
          bairro: ['', []],
          logradouro: ['', []],
        })

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

  getCep() {
    const cep: string = this.productForm.get('supplier')?.get('address')?.get('cep')?.value;

    this.correiosService.requestCEP(cep).subscribe({
      next: (result: Address) => {
        this.productForm?.get('supplier')?.get('address')?.patchValue({
          cep: result.cep,
          localidade: result.localidade,
          uf: result.uf,
          bairro: result.bairro,
          logradouro: result.logradouro,
        })
      },
      error: (error) => { console.error(error); }
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

    this.productForm.get?.('supplier')?.patchValue({
      corporateName: this.product.supplier.corporateName,
      cnpj: this.product.supplier.cnpj,
    })

    this.productForm.get?.('supplier')?.get('contact')?.patchValue({
      cellphone: this.product.supplier.contact.cellphone,
      email: this.product.supplier.contact.email,
    })

    this.productForm.get?.('supplier')?.get('address')?.patchValue({
      cep: this.product.supplier.address.cep,
      localidade: this.product.supplier.address.localidade,
      uf: this.product.supplier.address.uf,
      bairro: this.product.supplier.address.bairro,
      logradouro: this.product.supplier.address.logradouro,
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
