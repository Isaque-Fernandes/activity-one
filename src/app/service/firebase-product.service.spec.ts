import { TestBed } from '@angular/core/testing';

import { FirebaseProductService } from './firebase-product.service';

describe('FirebaseProductService', () => {
  let service: FirebaseProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
