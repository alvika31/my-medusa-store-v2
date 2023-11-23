import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const countProductWishlist = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const { product_id } = req.params
        if (!product_id || typeof product_id !== 'string') {
            res.status(400).json({ message: "Invalid or missing product_id" });
            return
        }
        const wishlistService = req.scope.resolve('wishlistNameService');
        const variant = await wishlistService.countUserWishlistProduct(product_id);
        res.json({
            variant: variant,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
