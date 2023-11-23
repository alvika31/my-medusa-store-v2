import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const wishlistGet = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const { customer_id } = req.params
        if (!customer_id || typeof customer_id !== 'string') {
            res.status(400).json({ message: "Invalid or missing customer_id" });
            return
        }
        const wishlistService = req.scope.resolve('wishlistNameService');
        const wishlist = await wishlistService.getWishlistCustomer(customer_id);
        res.json({
            wishlist: wishlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
