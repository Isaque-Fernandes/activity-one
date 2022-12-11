import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../model/address.model';
import { Supplier } from '../model/supplier.model';
import { CorreiosService } from '../service/correios.service';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  supplierForm!: FormGroup;
  supplier!: Supplier;

  notificationMessage !: string;
  editable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private correiosService: CorreiosService,
    private supplierService: SupplierService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
        corporateName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ùÂ-û ]+$/)]],
        cnpj: ['', [Validators.required, Validators.pattern(/\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/)]],
        contact: this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          cellphone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
        }),

        address: this.formBuilder.group({
          cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
          localidade: ['', [Validators.required,]],
          uf: ['', [Validators.required,]],
          bairro: ['', [Validators.required,]],
          logradouro: ['', [Validators.required,]],
        })

      })


    this.activatedRoute.paramMap.subscribe(params => {
      const catchSupplierId = +params.get('id')!;

      if (catchSupplierId) {
        this.supplierService.find(catchSupplierId).subscribe({
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

  register(): void {
    const supplier = this.supplierForm.getRawValue() as Supplier;

    this.supplierService.register(supplier).subscribe({
      next: () => {
        this.supplierForm.reset();

        this.router.navigateByUrl('/tabs/tab5');
      },
      error: (error: any) => { console.error(error); }
    })
  }

  getCep() {
    const cep: string = this.supplierForm.get('address')?.get('cep')?.value;

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

  update() {
    const supplier = this.supplierForm.getRawValue() as Supplier;
    supplier.id = this.supplier.id;

    this.supplierService.update(supplier).subscribe({
      next: () => {
        this.router.navigateByUrl('/tabs/tab5');
        this.supplierForm.reset();
      },
      error: (err) => { console.error(err); this.supplierForm.reset() }
    })
  }

}
