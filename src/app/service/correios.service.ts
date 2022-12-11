import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../model/address.model';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  constructor(
    private http: HttpClient,
  ) { }

  requestCEP(cepNumber: string): Observable<Address> {
    return this.http.get<Address>(`${environment.VIACEP_URL}/${cepNumber}/json/`);

  }
}
