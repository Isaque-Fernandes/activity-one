import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  products!: Product[];

  constructor(
    private productService: ProductService
  ) { }

  public ionViewWillEnter(): void {
    this.list();
  }

  list() {
    this.productService.list().subscribe({
      next: (rs) => { this.products = rs },
      error: (err) => { console.error(err) },
    })
  }

}
