import { Customer as MedusaCustomer } from "@medusajs/medusa";
import { Product as MedusaProduct } from "@medusajs/medusa"
import { Column, Entity, OneToMany } from "typeorm"
import { WishlistName } from "./wishlistName";
import { Wishlist } from "./wishlist";
import { ProductVariant as MedusaProductVariant } from "@medusajs/medusa";

@Entity()
export class ProductVariant extends MedusaProductVariant {
    @OneToMany(() => Wishlist, wishlist => wishlist.variant)
    wishlists: Wishlist[];
}