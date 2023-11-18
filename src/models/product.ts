import { Customer as MedusaCustomer } from "@medusajs/medusa";
import { Product as MedusaProduct } from "@medusajs/medusa"
import { Column, Entity, OneToMany } from "typeorm"
import { WishlistName } from "./wishlistName";
import { Wishlist } from "./wishlist";

@Entity()
export class Product extends MedusaProduct {
    @OneToMany(() => Wishlist, wishlist => wishlist.products)
    wishlists: Wishlist[];
}