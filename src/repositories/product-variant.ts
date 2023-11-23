// import { ProductVariant } from "@medusajs/medusa"
import { ProductVariant } from "../models/productVariant"
import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import {
    // alias the core repository to not cause a naming conflict
    ProductVariantRepository as MedusaProductVariantRepository,
} from "@medusajs/medusa/dist/repositories/product-variant"

export const ProductVariantRepository = dataSource
    .getRepository(ProductVariant)
    .extend({
        // it is important to spread the existing repository here.
        //  Otherwise you will end up losing core properties
        ...MedusaProductVariantRepository,
    })

export default ProductVariantRepository