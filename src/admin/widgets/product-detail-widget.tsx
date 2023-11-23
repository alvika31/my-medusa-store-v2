import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin";
import { useAdminCustomQuery } from "medusa-react";
import { useParams } from "react-router-dom";

type VariantCounts = {
  [key: string]: number;
};

type field = {
  totalUsers: number;
  variantCounts: VariantCounts;
};

type AdminWishlistRes = {
  variant: field;
};

type AdminWishlistQuery = {
  expand?: string;
  fields?: string;
};

const ProductDetailWidget = ({ product }: ProductDetailsWidgetProps) => {
  const { id } = useParams();
  const { data, isLoading } = useAdminCustomQuery<
    AdminWishlistQuery,
    AdminWishlistRes
  >(`/${id}/count/wishlist`, ["product_variant_customer", id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg text-ui-fg-subtle px-0 pt-4 pb-4">
      <div>
        <div className="border-grey-20 group  px-8">
          <h1 className="font-sans font-medium h1-core text-ui-fg-base">
            Data Count
          </h1>
          {data && data.variant ? (
            <>
              <p>
                Number of user have this product in wishlist:{" "}
                {data.variant.totalUsers}
              </p>
              <div>
                {Object.keys(data.variant.variantCounts || {}).map(
                  (variant) => (
                    <div key={variant}>
                      <p>
                        {variant}: {data.variant.variantCounts[variant] || 0}{" "}
                        user
                      </p>
                    </div>
                  )
                )}
                {Object.keys(data.variant?.variantCounts || {}).length ===
                  0 && <p>No users</p>}
              </div>
            </>
          ) : (
            <p>Data not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.before",
};
export default ProductDetailWidget;
