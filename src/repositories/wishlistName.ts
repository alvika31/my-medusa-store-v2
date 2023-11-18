import { WishlistName } from "../models/wishlistName";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const WishlistNameRepository = dataSource
  .getRepository(WishlistName)
  .extend({

  });

export default WishlistNameRepository;
