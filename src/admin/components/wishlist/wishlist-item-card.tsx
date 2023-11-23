import LineItemOptions from "./line-item-option";
import { formatAmount } from "medusa-react";
import { useRegions } from "medusa-react";
const WishlistItemCard = ({ wishlists }) => {
  const { regions } = useRegions();
  return (
    <>
      {wishlists.length === 0 && (
        <div className="bg-red-200 text-red-500 p-3 mt-3 rounded">
          Wishlist Item Is Empty
        </div>
      )}
      <div className="my-5 grid grid-cols-2 gap-4">
        {wishlists.map((item, index) => {
          return (
            <div key={index} className="flex gap-x-3 my-3 items-center">
              <img
                src={item?.variant?.product?.thumbnail}
                width={150}
                alt={item?.variant?.product?.title}
              />

              <div className="flex flex-col gap-y-1">
                <h3 className="text-md font-medium">
                  {item?.variant?.product?.title}
                </h3>
                <div className="flex flex-col gap-y-1">
                  <LineItemOptions variant={item?.variant} />
                  {item.variant?.prices.map((price: any, index: string) => {
                    const matchingRegion = regions?.find(
                      (region) => region.currency_code === price.currency_code
                    );
                    return (
                      <div key={index}>
                        <p className="text-xs">
                          Unit Price:{" "}
                          {matchingRegion &&
                            formatAmount({
                              amount: price.amount || 0,
                              region: matchingRegion,
                              includeTaxes: false,
                            })}
                        </p>
                      </div>
                    );
                  })}
                  {item?.variant?.inventory_quantity === 0 && (
                    <div className="px-4 py-1 bg-red-500 text-white text-xs z-10 w-32 text-center">
                      Out Of Stock
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WishlistItemCard;
