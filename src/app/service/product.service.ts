import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

const HttpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json;charset=utf-8',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  register(product: Product): Observable<any> {
    return this.http.post(`${environment.JSON_SERVER_URL}/product`, product, HttpOptions);
  }

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.JSON_SERVER_URL}/product`);
  }

  find(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.JSON_SERVER_URL}/product/${id}`);
  }

  update(product: Product): Observable<any> {
    return this.http.put(`${environment.JSON_SERVER_URL}/product/${product.id}`, product, HttpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.JSON_SERVER_URL}/product/${id}`);
  }

}
