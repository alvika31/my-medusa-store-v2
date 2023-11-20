import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import WishlistNameRepository from "src/repositories/wishlistName";

export const updateWishlist = async (req: MedusaRequest, res: MedusaResponse): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: "Invalid or missing id" });
            return;
        }

        const wishlistNameRepository: typeof WishlistNameRepository = req.scope.resolve("wishlistNameRepository");
        const manager: EntityManager = req.scope.resolve("manager");
        const wishListRepo = manager.withRepository(wishlistNameRepository);

        const wishlist = await wishListRepo.findOne({
            where: { id: id }
        });

        if (!wishlist) {
            res.status(404).json({ message: "Wishlist Name not found" });
            return;
        }

        if (req.user?.customer_id === wishlist.customer_id) {
            const data = {
                title: req.body.title
            };

            Object.assign(wishlist, data);
            await wishListRepo.save(wishlist);

            res.json({ message: 'Wishlist Updated' });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
