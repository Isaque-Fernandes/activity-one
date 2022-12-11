import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../model/supplier.model';

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
export class SupplierService {

  constructor(
    private http: HttpClient,
  ) { }

  register(supplier: Supplier): Observable<any> {
    return this.http.post(`${environment.JSON_SERVER_URL}/supplier`, supplier, HttpOptions);
  }

  list(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${environment.JSON_SERVER_URL}/supplier`);
  }

  find(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${environment.JSON_SERVER_URL}/supplier/${id}`);
  }

  update(supplier: Supplier): Observable<any> {
    return this.http.put(`${environment.JSON_SERVER_URL}/supplier/${supplier.id}`, supplier, HttpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.JSON_SERVER_URL}/supplier/${id}`);
  }

}
