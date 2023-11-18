import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import WishlistNameRepository from "src/repositories/wishlistName";

export const wishlistGet = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const { customer_id } = req.params
        if (!customer_id || typeof customer_id !== 'string') {
            res.status(400).json({ message: "Invalid or missing customer_id" });
            return
        }
        const wishlistNameRepository: typeof WishlistNameRepository = req.scope.resolve("wishlistNameRepository");
        const manager: EntityManager = req.scope.resolve("manager");
        const wishListRepo = manager.withRepository(wishlistNameRepository);

        const wishlistByCustomer = await wishListRepo.find({
            order: { id: 'ASC' },
            where: { customer_id: customer_id },
            relations: ['region', 'wishlists.variant.prices', 'wishlists.variant.product.options', 'wishlists.variant.options'],

        });
        res.json({
            wishlist: wishlistByCustomer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
