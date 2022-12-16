import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../model/address.model';
import { Supplier } from '../model/supplier.model';
import { CorreiosService } from '../service/correios.service';
import { FirebaseSupplierService } from '../service/firebase-supplier.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @ViewChild('supplierFormDirective') supplierFormDirective!: FormGroupDirective;

  supplierForm!: FormGroup;
  supplier!: Supplier;

  notificationMessage !: string;
  editable: boolean = false;

  constructor(
    private correiosService: CorreiosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firebase: FirebaseSupplierService
  ) { }

  ngOnInit(): void {
    this.supplierForm = new FormGroup({
      'corporateName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ùÂ-û ]+$/)]),
      'cnpj': new FormControl('', [Validators.pattern(/\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/)]),
      'contact': new FormGroup({
        'cellphone': new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
        'email': new FormControl('', [Validators.required, Validators.email]),
      }),
      'address': new FormGroup({
        'cep': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
        'localidade': new FormControl('', [Validators.required,]),
        'uf': new FormControl('', [Validators.required,]),
        'bairro': new FormControl('', [Validators.required,]),
        'logradouro': new FormControl('', [Validators.required,]),
      })
    })

    this.activatedRoute.paramMap.subscribe(params => {
      const catchSupplierId = params.get('id')!;

      if (catchSupplierId) {
        this.firebase.find(catchSupplierId).subscribe({
          next: (rs) => {
            this.supplier = rs;
            this.editable = true;
            this.loadForm();
          },
          error: (err) => { console.error(err); }
        })
      };
    })
  }

  register(values: any): void {
    let supplier: Supplier = { ...values };
    this.firebase.save(supplier);
    this.supplierForm.reset();
    this.router.navigateByUrl('/tabs/tab5');
  }

  getCep(value: any) {
    let supplier: Supplier = { ...value };

    const cep: string = supplier.address.cep;

    this.correiosService.requestCEP(cep).subscribe({
      next: (result: Address) => {
        this.supplierForm?.get('address')?.patchValue({
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
    this.supplierForm.patchValue({
      corporateName: this.supplier.corporateName,
      cnpj: this.supplier.cnpj,
    })

    this.supplierForm?.get('contact')?.patchValue({
      cellphone: this.supplier.contact.cellphone,
      email: this.supplier.contact.email,
    })

    this.supplierForm?.get('address')?.patchValue({
      cep: this.supplier.address.cep,
      localidade: this.supplier.address.localidade,
      uf: this.supplier.address.uf,
      bairro: this.supplier.address.bairro,
      logradouro: this.supplier.address.logradouro,
    })
  }

  update(values: any) {
    let supplier: Supplier = { ...values };
    supplier.id = this.supplier.id;

    this.firebase.update(supplier);

    this.router.navigateByUrl('/tabs/tab5');

  }

}
