
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Wishlist } from "../models/wishlist";

export const WishlistRepository = dataSource
  .getRepository(Wishlist)
  .extend({

  });

export default WishlistRepository;
