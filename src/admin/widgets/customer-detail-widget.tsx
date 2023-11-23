import type { WidgetConfig } from "@medusajs/admin";
import { useAdminCustomQuery } from "medusa-react";
import { useParams } from "react-router-dom";
import WishlistCard from "../components/wishlist/wishlist-card";

type region = {
  name: string;
  currency_code: string;
};

type Wishlist = {
  title: string;
  customer_id: string;
  total: number;
  region_id: string;
  region: region;
  wishlists: (number | string)[];
  id: string;
};

type AdminWishlistRes = {
  wishlist: Wishlist[];
  title: string;
};

type AdminWishlistQuery = {
  expand?: string;
  fields?: string;
};

const CustomerDetailWidget = () => {
  const { id } = useParams();

  const { data, isLoading } = useAdminCustomQuery<
    AdminWishlistQuery,
    AdminWishlistRes
  >(`/${id}/wishlist`, ["wishlist", id]);

  return (
    <div>
      <div className="rounded-rounded bg-grey-0 border-grey-20 flex h-full w-full flex-col overflow-hidden border min-h-[350px]">
        <div className="relative"></div>
        <div className="flex grow flex-col">
          <div className="px-xlarge py-large">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="inter-xlarge-semibold text-grey-90">Wishlist</h1>
              </div>
              <div className="flex items-center space-x-2"></div>
            </div>
          </div>
          <div className="px-xlarge">
            <div className="flex flex-col grow">
              <div className="flex  grow flex-col">
                <div>
                  <WishlistCard wishlist={data} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "customer.details.after",
};

export default CustomerDetailWidget;
