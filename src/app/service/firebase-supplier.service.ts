import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '../model/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseSupplierService {

  constructor(private firestore: Firestore) { }

  save(supplier: Supplier): Promise<void> {
    const document = doc(collection(this.firestore, 'suppliers'));
    return setDoc(document, supplier);
  }

  list(): Observable<Supplier[]> {
    const contactsCollection = collection(this.firestore, 'suppliers');
    return collectionData(contactsCollection, { idField: 'id' })
      .pipe(
        map(result => result as Supplier[])
      );
  }

  find(id: string): Observable<Supplier> {
    const document = doc(this.firestore, `suppliers/${id}`);
    return docSnapshots(document)
      .pipe(
        map(doc => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as Supplier;
        })
      );
  }

  update(supplier: Supplier): Promise<void> {
    const document = doc(this.firestore, 'suppliers', supplier?.id);
    const { id, ...data } = supplier;
    return setDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'suppliers', id);
    return deleteDoc(document);
  }

}
