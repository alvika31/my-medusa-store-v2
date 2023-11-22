import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";


export const getWishlistByCustomer = async (req: MedusaRequest, res: MedusaResponse): Promise<void> => {
  try {

    const wishlistService = req.scope.resolve('wishlistNameService');
    const isAuthorized = req.user && req.user.customer_id;

    if (isAuthorized) {
      const wishlist = await wishlistService.getWishlistCustomer(req.user.customer_id);
      res.json({ wishlist });
    } else {
      res.status(401).json({ wishlist: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
