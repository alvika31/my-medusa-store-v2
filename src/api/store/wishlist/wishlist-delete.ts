import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import WishlistNameRepository from "src/repositories/wishlistName";
import WishlistRepository from "src/repositories/wishlist";
import { check, validationResult } from "express-validator";

export const deleteWishlist = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: "Invalid or missing id" });
            return
        }
        const manager: EntityManager = req.scope.resolve("manager");
        const wishlistRepository: typeof WishlistRepository = req.scope.resolve("wishlistRepository");

        const wishListRepo = manager.withRepository(wishlistRepository);

        const wishlistNameRepository: typeof WishlistNameRepository =
            req.scope.resolve("wishlistNameRepository");
        const wishListNameRepo = manager.withRepository(wishlistNameRepository);

        if (req.user && req.user.customer_id) {
            const wishlistName = await wishListNameRepo.findOne({
                where: {
                    id: id
                }
            })
            if (!wishlistName) {
                res.status(400).json({ message: "Invalid wishlistname id" });
                return
            }
            const wishlist = await wishListRepo.find({
                where: {
                    wishlist_name_id: id
                }
            })

            if (!wishlist) {
                res.status(400).json({ message: "Invalid wishlistname id" });
                return
            }
            await wishListNameRepo.remove([wishlistName])
            await wishListRepo.remove(wishlist)
            res.json({ message: 'Wishlist Deleted' })

        } else {
            res.status(401).json({
                wishlist: 'Unauthorized',
            });
        }

    } catch (error) {
        console.log(error)
    }
}