import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import WishlistRepository from "src/repositories/wishlist";
import WishlistNameRepository from "src/repositories/wishlistName";

export const deleteWishlist = async (req: MedusaRequest, res: MedusaResponse): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: "Invalid or missing id" });
            return;
        }

        const manager: EntityManager = req.scope.resolve("manager");
        const wishlistRepository: typeof WishlistRepository = req.scope.resolve("wishlistRepository");
        const wishListNameRepository: typeof WishlistNameRepository = req.scope.resolve("wishlistNameRepository");

        const wishListRepo = manager.withRepository(wishlistRepository);
        const wishListNameRepo = manager.withRepository(wishListNameRepository);

        const wishlistName = await wishListNameRepo.findOne({
            where: { id: id }
        });

        if (!wishlistName) {
            res.status(400).json({ message: "Invalid wishlistname id" });
            return;
        }

        if (req.user?.customer_id === wishlistName.customer_id) {
            const wishlist = await wishListRepo.find({
                where: { wishlist_name_id: id }
            });

            await wishListNameRepo.remove([wishlistName]);
            await wishListRepo.remove(wishlist);
            res.json({ message: 'Wishlist Deleted' });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
