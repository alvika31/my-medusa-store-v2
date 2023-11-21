import { TransactionBaseService } from "@medusajs/medusa"
import WishlistNameRepository from "src/repositories/wishlistName";
import WishlistRepository from "src/repositories/wishlist";
import { WishlistName } from "src/models/wishlistName";
import { Wishlist } from "src/models/wishlist";
import { MedusaError } from 'medusa-core-utils'
import { Lifetime } from "awilix"

class WishlistNameService extends TransactionBaseService {
    static LIFE_TIME = Lifetime.SCOPED
    protected wishlistNameRepository_: typeof WishlistNameRepository;
    protected wishlistRepository_: typeof WishlistRepository;

    constructor(container) {
        super(container);
        this.wishlistNameRepository_ = container.wishlistNameRepository;
        this.wishlistRepository_ = container.wishlistRepository;
    }

    async getWishlistCustomer(customer_id: string): Promise<WishlistName[]> {
        const wishlistNameRepo = this.activeManager_.withRepository(
            this.wishlistNameRepository_
        );

        const wishlistByCustomer = await wishlistNameRepo.find({
            where: { customer_id },
            relations: ['region', 'wishlists.variant.prices', 'wishlists.variant.product.options', 'wishlists.variant.options']
        });
        if (!wishlistByCustomer) {
            throw new MedusaError(MedusaError.Types.NOT_FOUND, `Customer_id not found`)
        }

        return wishlistByCustomer;
    }

    async retrieveWishlistName(id: string): Promise<WishlistName> {
        const wishlistNameRepo = this.activeManager_.withRepository(
            this.wishlistNameRepository_
        );

        const wishlistName = await wishlistNameRepo.findOne({
            where: {
                id: id
            }
        })
        if (!wishlistName) {
            throw new MedusaError(MedusaError.Types.NOT_FOUND, `id wishlist name not found`)
        }

        return wishlistName
    }

    async retrieveAllWishlistItemByWishlistName(wishlist_name_id: string): Promise<Wishlist[]> {
        const wishlistRepo = this.activeManager_.withRepository(
            this.wishlistRepository_
        );

        const wishlist = await wishlistRepo.find({
            where: {
                wishlist_name_id: wishlist_name_id
            }
        })

        return wishlist
    }

    async retrieveWishlistItem(id: string): Promise<Wishlist> {
        const wishlistRepo = this.activeManager_.withRepository(
            this.wishlistRepository_
        );

        const wishlistItem = await wishlistRepo.findOne({
            where: {
                id: id
            }
        })
        if (!wishlistItem) {
            throw new MedusaError(MedusaError.Types.NOT_FOUND, `id wishlist not found`)
        }

        return wishlistItem
    }

    async deleteWishlistName(id: string): Promise<void> {
        return await this.atomicPhase_(async (manager) => {
            const wishlistNameRepo = manager.withRepository(
                this.wishlistNameRepository_
            )

            const wishlistRepo = manager.withRepository(
                this.wishlistRepository_
            )

            const wishlistName = await this.retrieveWishlistName(id)
            const wishlist = await this.retrieveAllWishlistItemByWishlistName(id)

            if (wishlist) {
                await wishlistRepo.remove(wishlist)
            }

            await wishlistNameRepo.remove([wishlistName])
        })
    }

    async deleteWishlistItem(id: string): Promise<void> {
        return await this.atomicPhase_(async (manager) => {
            const wishlistRepo = manager.withRepository(
                this.wishlistRepository_
            )
            const wishlist = await this.retrieveWishlistItem(id)
            await wishlistRepo.remove([wishlist])
        })
    }

    async updateWishlistName(id: string, data: Omit<Partial<WishlistName>, "title">): Promise<WishlistName> {
        return await this.atomicPhase_(async (manager) => {
            const wishlistNameRepo = manager.withRepository(
                this.wishlistNameRepository_
            )
            const wishlistname = await this.retrieveWishlistName(id)

            Object.assign(wishlistname, data)

            return await wishlistNameRepo.save(wishlistname)
        })
    }

    async createWishlistName(
        data: Pick<WishlistName, "title" | "customer_id" | "region_id">
    ): Promise<WishlistName> {
        return this.atomicPhase_(async (manager) => {
            const wishlistNameRepo = manager.withRepository(
                this.wishlistNameRepository_
            )
            const wishlistname = wishlistNameRepo.create()
            wishlistname.title = data.title
            wishlistname.customer_id = data.customer_id
            wishlistname.region_id = data.region_id
            const result = await wishlistNameRepo.save(wishlistname)

            return result
        })
    }

    async cekWishlistItemExist(wishlist_name_id: string, data: Pick<Wishlist, "product_id" | "variant_id">): Promise<Wishlist> {
        const wishlistRepo = this.activeManager_.withRepository(
            this.wishlistRepository_
        );

        const wishlistItem = await wishlistRepo.findOne({
            where: {
                product_id: data.product_id,
                wishlist_name_id: wishlist_name_id,
                variant_id: data.variant_id,
            }
        })
        // if (!wishlistItem) {
        //     throw new MedusaError(MedusaError.Types.NOT_FOUND, `id wishlist not found`)
        // }
        return wishlistItem
    }

    async createWishlistItem(wishlist_name_id: string, data: Pick<Wishlist, "product_id" | "variant_id">): Promise<Wishlist> {
        return this.atomicPhase_(async (manager) => {
            const wishlistRepo = manager.withRepository(
                this.wishlistRepository_
            );
            const wishlistItem = wishlistRepo.create()
            wishlistItem.variant_id = data.variant_id
            wishlistItem.product_id = data.product_id
            wishlistItem.wishlist_name_id = wishlist_name_id
            const result = await wishlistRepo.save(wishlistItem)

            return result
        })
    }

}

export default WishlistNameService;
