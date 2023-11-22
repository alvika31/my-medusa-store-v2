import { Router } from "express";
import { wrapHandler } from "@medusajs/medusa";
import { insertWishlist } from "./wishlist-insert";
import { getWishlistByCustomer } from "./wishlist-by-customer";
import { deleteWishlist } from "./wishlist-delete";
import { updateWishlist } from "./wishlist-update";
import { insertWishlistItem } from "./wishlist-item-insert";
import { deleteWishlistItem } from "./wishlist-item-delete";
import { authenticateCustomer } from "@medusajs/medusa"

export default function wishlistRouters(router: Router) {
    router.get("/store/wishlist/customer", authenticateCustomer(), wrapHandler(getWishlistByCustomer));
    router.post("/store/wishlist", authenticateCustomer(), wrapHandler(insertWishlist));
    router.delete("/store/wishlist/:id", authenticateCustomer(), wrapHandler(deleteWishlist));
    router.put("/store/wishlist/:id", authenticateCustomer(), wrapHandler(updateWishlist));
    router.delete("/store/wishlist-item/:id", authenticateCustomer(), wrapHandler(deleteWishlistItem));
    router.post("/store/wishlist/:wishlist_name_id/wishlist-item", authenticateCustomer(), wrapHandler(insertWishlistItem));
}
