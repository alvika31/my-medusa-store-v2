import { Customer as MedusaCustomer } from "@medusajs/medusa";
import { Column, Entity, OneToMany } from "typeorm"
import { WishlistName } from "./wishlistName";

@Entity()
export class Customer extends MedusaCustomer {
    @OneToMany(() => WishlistName, wishlistName => wishlistName.customer)
    wishlistsName: WishlistName[];
}