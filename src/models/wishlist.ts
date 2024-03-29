import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { WishlistName } from "./wishlistName";
import { ProductVariant } from "./productVariant";

@Entity()
export class Wishlist extends BaseEntity {

  @Column({ type: "varchar" })
  wishlist_name_id: string;

  @Column({ nullable: true })
  variant_id: string;

  @ManyToOne(() => ProductVariant, variant => variant.wishlists)
  @JoinColumn({ name: "variant_id" })
  variant: ProductVariant;

  @ManyToOne(() => WishlistName, wishlistName => wishlistName.wishlists)
  @JoinColumn({ name: "wishlist_name_id" })
  wishlistName: WishlistName;


  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "wishlist");
  }
}
