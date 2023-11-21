import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const updateWishlist = async (req: MedusaRequest, res: MedusaResponse): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: "Invalid or missing id" });
            return;
        }
        const wishlistNameService = req.scope.resolve('wishlistNameService');
        const wishlistName = await wishlistNameService.retrieveWishlistName(id)
        if (!wishlistName) {
            res.status(404).json({ message: "Wishlist Name not found" });
            return;
        }
        if (req.user?.customer_id === wishlistName.customer_id) {
            const payload = { title: req.body.title }
            await wishlistNameService.updateWishlistName(id, payload)
            res.json({ message: 'Wishlist Updated' });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
