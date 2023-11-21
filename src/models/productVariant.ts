import { Entity, OneToMany } from "typeorm"
import { Wishlist } from "./wishlist";
import { ProductVariant as MedusaProductVariant } from "@medusajs/medusa";

@Entity()
export class ProductVariant extends MedusaProductVariant {
    @OneToMany(() => Wishlist, wishlist => wishlist.variant)
    wishlists: Wishlist[];
}