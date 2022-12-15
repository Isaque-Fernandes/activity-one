import { TestBed } from '@angular/core/testing';

import { FirebaseSupplierService } from './firebase-supplier.service';

describe('FirebaseSupplierService', () => {
  let service: FirebaseSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
