import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import WishlistNameRepository from "src/repositories/wishlistName";


export const updateWishlist = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        const { id } = req.params
        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: "Invalid or missing id" });
            return
        }
        const wishlistNameRepository: typeof WishlistNameRepository =
            req.scope.resolve("wishlistNameRepository");
        const manager: EntityManager = req.scope.resolve("manager");
        const wishListRepo = manager.withRepository(wishlistNameRepository);

        if (req.user && req.user.customer_id) {
            const data = {
                title: req.body.title
            }

            const wishlist = await wishListRepo.findOne({
                where: {
                    id: id
                }
            })

            Object.assign(wishlist, data)
            await wishListRepo.save(wishlist)
            res.json({ message: 'Wishlist Updated' })

        } else {
            res.status(401).json({
                wishlist: 'Unauthorized',
            });
        }

    } catch (error) {
        console.log(error)
    }

}
