import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import WishlistRepository from "src/repositories/wishlist";
import { IsString } from "class-validator";
import { validator } from "@medusajs/medusa";
import WishlistNameRepository from "src/repositories/wishlistName";

export const insertWishlistItem = async (
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> => {
    try {
        const { wishlist_name_id } = req.params;

        if (!wishlist_name_id || typeof wishlist_name_id !== "string") {
            res.status(400).json({ message: "Invalid or missing wishlist_name_id" });
            return;
        }

        const manager: EntityManager = req.scope.resolve("manager");

        const wishlistRepository: typeof WishlistRepository = req.scope.resolve("wishlistRepository");
        const wishlistRepo = manager.withRepository(wishlistRepository);

        const validated = await validator(StorePostWishlistReq, req.body);

        const wishlistNameRepository: typeof WishlistNameRepository = req.scope.resolve("wishlistNameRepository");
        const wishlistNameRepo = manager.withRepository(wishlistNameRepository);

        const wishlistName = await wishlistNameRepo.findOne({
            where: {
                id: wishlist_name_id
            },
            relations: ["wishlists"],
        });

        if (!wishlistName) {
            res.status(404).json({ message: "Wishlist Name not found" });
            return;
        }

        if (req.user?.customer_id === wishlistName.customer_id) {
            const existingWishlist = await wishlistRepo.findOne({
                where: {
                    product_id: validated.product_id,
                    wishlist_name_id: wishlist_name_id,
                    variant_id: validated.variant_id,
                }
            });

            if (existingWishlist) {
                res.status(400).json({ message: "Wishlist already exists" });
                return;
            }

            const wishlist = wishlistRepo.create();
            wishlist.product_id = validated.product_id;
            wishlist.variant_id = validated.variant_id;
            wishlist.wishlist_name_id = wishlist_name_id;

            const result = await wishlistRepo.save(wishlist);

            if (result) {
                res.status(201).json({
                    message: "Success Insert Wishlist Item",
                });
            }
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

export class StorePostWishlistReq {
    @IsString()
    product_id: string;

    @IsString()
    variant_id: string;
}
