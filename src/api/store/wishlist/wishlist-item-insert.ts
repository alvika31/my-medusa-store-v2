import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { IsString } from "class-validator";
import { validator } from "@medusajs/medusa";

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

        const wishlistNameService = req.scope.resolve('wishlistNameService');
        const validated = await validator(StorePostWishlistReq, req.body);
        const wishlistName = await wishlistNameService.retrieveWishlistName(wishlist_name_id)
        if (!wishlistName) {
            res.status(404).json({ message: "Wishlist Name not found" });
            return;
        }
        if (req.user?.customer_id === wishlistName.customer_id) {
            const payload = { product_id: validated.product_id, variant_id: validated.variant_id }
            const existingWishlist = await wishlistNameService.cekWishlistItemExist(wishlist_name_id, payload)
            if (existingWishlist) {
                res.status(400).json({ message: "Wishlist already exists" });
                return;
            }
            await wishlistNameService.createWishlistItem(wishlist_name_id, payload)
            res.status(201).json({
                message: "Success Insert Wishlist Item",
            });
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
