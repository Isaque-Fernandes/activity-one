import { Address } from "./address.model";
import { Contact } from "./contact.model";

export class Supplier {
    id!: string;
    corporateName!: string;
    cnpj!: string;
    contact!: Contact;   
    address!: Address;
}