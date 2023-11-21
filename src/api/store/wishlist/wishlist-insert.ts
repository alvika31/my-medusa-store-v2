import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { IsString } from "class-validator";
import { validator } from "@medusajs/medusa";


export const insertWishlist = async (
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> => {
  try {
    const validated = await validator(StorePostWishlistNameReq, req.body);
    const wishlistNameService = req.scope.resolve('wishlistNameService');

    if (req.user?.customer_id === validated.customer_id) {
      const payload = { title: validated.title, customer_id: validated.customer_id, region_id: validated.region_id }
      await wishlistNameService.createWishlistName(payload);
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
  title: string;

  @IsString()
  customer_id: string;

  @IsString()
  region_id: string;
}
