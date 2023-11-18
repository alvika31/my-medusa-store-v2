import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import WishlistNameRepository from "src/repositories/wishlistName";
import { IsString } from "class-validator"
import { validator } from "@medusajs/medusa";

export const insertWishlist = async (
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> => {
  try {
    const validated = await validator(StorePostWishlistNameReq, req.body)
    const wishlistNameRepository: typeof WishlistNameRepository = req.scope.resolve("wishlistNameRepository");
    const manager: EntityManager = req.scope.resolve("manager");

    const wishListRepo = manager.withRepository(wishlistNameRepository);
    if (req.user && req.user.customer_id) {

      const wishlistName = wishListRepo.create();
      wishlistName.title = validated.title;
      wishlistName.customer_id = validated.customer_id;
      wishlistName.region_id = validated.region_id;
      await wishListRepo.save(wishlistName);

      res.status(201).json({
        message: "Success Insert Wishlist",
      });
    } else {
      res.status(401).json({
        wishlist: 'Unauthorized',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export class StorePostWishlistNameReq {
  @IsString()
  title: string

  @IsString()
  customer_id: string

  @IsString()
  region_id: string

}