import { BeforeInsert, Column, Entity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { Wishlist } from "./wishlist";
import { Customer } from "./customer";

@Entity()
export class WishlistName extends BaseEntity {
  @Column()
  title: string;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer, customer => customer.wishlistsName)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => Wishlist, wishlist => wishlist.wishlistName, { cascade: true })
  wishlists: Wishlist[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "wishlistName");
  }

}
