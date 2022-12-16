import { Supplier } from "./supplier.model";

export interface Product {
    id: string;
    productName: string;
    quantity: number;
    purchasePrice: number;
    percentage: number;
    salePrice: number;
    supplier: Supplier;
}