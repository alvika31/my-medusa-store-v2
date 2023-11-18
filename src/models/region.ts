import { Customer as MedusaCustomer } from "@medusajs/medusa";
import { Column, Entity, OneToMany } from "typeorm"
import { WishlistName } from "./wishlistName";
import { Region as MedusaRegion } from "@medusajs/medusa";

@Entity()
export class Region extends MedusaRegion {
    @OneToMany(() => WishlistName, wishlistName => wishlistName.region)
    wishlistsName: WishlistName[];
}