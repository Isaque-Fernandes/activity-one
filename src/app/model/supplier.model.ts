import { Address } from "./address.model";
import { Contact } from "./contact.model";

export interface Supplier{
    id: number;
    corporateName: string;
    cnpj: string;    
    contact: Contact;   
    address: Address;
}