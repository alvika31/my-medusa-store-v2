import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";


export const getWishlistByCustomer = async (req: MedusaRequest, res: MedusaResponse): Promise<void> => {
  try {
    const { customer_id } = req.params;

    if (!customer_id || typeof customer_id !== 'string') {
      res.status(400).json({ message: "Invalid or missing customer_id" });
      return;
    }
    const wishlistService = req.scope.resolve('wishlistNameService');
    const isAuthorized = req.user && req.user.customer_id && req.user.customer_id === customer_id;

    if (isAuthorized) {
      const wishlist = await wishlistService.getWishlistCustomer(customer_id);
      res.json({ wishlist });
    } else {
      res.status(401).json({ wishlist: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
