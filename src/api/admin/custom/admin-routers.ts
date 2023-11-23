import { wishlistGet } from "./wishlist-get";
import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import { authenticate } from "@medusajs/medusa"
import {
  getConfigFile,
} from "medusa-core-utils"
import {
  ConfigModule,
} from "@medusajs/medusa/dist/types/global"
import cors from "cors"
import { countProductWishlist } from "./count-product-wishlist";
export default function adminRouters(rootDirectory, router: Router) {

  const { configModule } = getConfigFile<ConfigModule>(rootDirectory, "medusa-config");
  const { projectConfig } = configModule;

  const adminCorsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  };
  router.get("/admin/:customer_id/wishlist", cors(adminCorsOptions), authenticate(), wrapHandler(wishlistGet));
  router.get("/admin/:product_id/count/wishlist", cors(adminCorsOptions), authenticate(), wrapHandler(countProductWishlist));
}
