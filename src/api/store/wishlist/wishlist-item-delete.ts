import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const deleteWishlistItem = async (req: MedusaRequest, res: MedusaResponse): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: "Invalid or missing id" });
            return;
        }
        const wishlistNameService = req.scope.resolve('wishlistNameService');
        const wishlistItem = await wishlistNameService.retrieveWishlistItem(id)
        if (!wishlistItem) {
            res.status(400).json({ message: "Wishlist Item Not Found" });
            return;
        }
        const wishlistName = await wishlistNameService.retrieveWishlistName(wishlistItem.wishlist_name_id)
        if (!wishlistName) {
            res.status(400).json({ message: "Invalid wishlistname id" });
            return;
        }
        if (req.user?.customer_id === wishlistName.customer_id) {
            await wishlistNameService.deleteWishlistItem(id);
            res.json({ message: 'Wishlist Item Deleted' });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
