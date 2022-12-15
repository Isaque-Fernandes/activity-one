import { Injectable } from '@angular/core';
import { Firestore, doc, collection, setDoc, collectionData, docSnapshots, deleteDoc } from '@angular/fire/firestore';
import { map, Observable} from 'rxjs';
import { Supplier } from '../model/supplier.model';
@Injectable({
  providedIn: 'root'
})
export class FirebaseSupplierService {

  constructor(
    private firestore: Firestore
  ) { }

  save(supplier: Supplier): Promise<void> {
    const document = doc(collection(this.firestore, 'suppliers'));
    return setDoc(document, supplier); //array_push($list, $Supplier)
  }

  list(): Observable<Supplier[]> {
    const suppliersCollection = collection(this.firestore, 'suppliers');
    return collectionData(suppliersCollection, { idField: 'id' })
      // executa e resgata o resultado
      .pipe(
        // percorre cada elemento de resultado retorna um array de resultados
        map(result => result as Supplier[])
      );
  }

  find(id: string): Observable<Supplier> {
    const document = doc(this.firestore, `suppliers/${id}`);
    return docSnapshots(document).pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Supplier
      })
    )
  }

  update(supplier: Supplier): Promise<void> {
    const document = doc(this.firestore, 'suppliers', supplier?.id);
    // monta um objeto  sem o campo id do model
    const { id, ...data } = supplier;
    console.log(id);
    return setDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'suppliers', id);

    return deleteDoc(document);
  }

}
