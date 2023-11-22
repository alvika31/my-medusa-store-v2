/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistName:
 *       type: object
 *       required:
 *         - title
 *         - customer_id
 *         - region_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the wishlist name id
 *         title:
 *           type: string
 *           description: The title of your wishlist name
 *         customer_id:
 *           type: string
 *           description: The wishlist name of customer
 *         region_id:
 *           type: string
 *           description: The price format of the total
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the wishlist name was added
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the wishlist name was updated
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - product_id
 *         - wishlist_name_id
 *         - variant_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the wishlist id
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the wishlist was added
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the wishlist was updated
 *         product_id:
 *           type: string
 *           description: The products added to wishlist
 *         wishlist_name_id: 
 *           type: string
 *           description: The wishlist that is entered into the wishlist name
 *         variant_id:
 *           type: string
 *           description: The variant of product
 */
/**
 * @swagger
 * tags:
 *   name: WishlistName
 *   description: wishlist name operation
 * /store/wishlist/customer:
 *   get:
 *     summary: Get wishlist by customer ID
 *     tags: [WishlistName]
 *     description: Retrieve wishlist information for a specific customer.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               wishlist:
 *                 - id: wishlistName_01HFEEFWVNCFZ5BR5TCS17P5GX
 *                   title: Alvika Tampan Wishlist
 *                   customer_id: cus_01HDVRJGHMVDAMWT73KKHSR9T2
 *                   region_id: reg_01HDVQ9V8R4FZ0Q2SBF6VN909E
 *                   region:
 *                     id: reg_01HDVQ9V8R4FZ0Q2SBF6VN909E
 *                     name: NA
 *                     currency_code: usd
 *                     # Add other region properties here
 *                   wishlists:
 *                     - id: wishlist_01HFGF5VMCSX2XBY38CNFPNVXG
 *                       product_id: prod_01HFDWK6MP832PJ2MRCSBES015
 *                       variant_id: variant_01HFDWK6PP1RXYF5P7BEXCBKQF
 *                       # Add other wishlist properties here
 *                       variant:
 *                         id: variant_01HFDWK6PP1RXYF5P7BEXCBKQF
 *                         title: Black / S
 *                         # Add other variant properties here
 *                         product:
 *                           id: prod_01HFDWK6MP832PJ2MRCSBES015
 *                           title: UNKL347 Jacket Hoodie Navy Model Simpel Bahan Fleece XOPA
 *                           # Add other product properties here
 *                           options:
 *                             - id: opt_01HFDWK6NN9BY1WN3PJME39X9Q
 *                               title: Color
 *                               # Add other option properties here
 *                               values:
 *                                 - id: optval_01HFDWK6PP9ZQ0H92PYDK6VBVM
 *                                   value: Black
 *                                   # Add other option value properties here
 *                             - id: opt_01HFDWK6NP1H45DD9MSN8C8008
 *                               title: Size
 *                               # Add other option properties here
 *                               values:
 *                                 - id: optval_01HFDWK6PPYR1FGE02FMAREZGR
 *                                   value: S
 *                                   # Add other option value properties here
 *                       # Add other wishlist properties here
 *                   # Add other wishlistName properties here
 *               # Add other response properties here
 *       400:
 *         description: Invalid or missing customer_id
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid or missing customer_id
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               wishlist: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
/**
 * @swagger
 * /store/wishlist:
 *   post:
 *     summary: Create a new wishlist name
 *     tags: [WishlistName]
 *     description: Create a new wishlist name for a customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the wishlist name.
 *               customer_id:
 *                 type: string
 *                 description: The ID of the customer for whom the wishlist name is created.
 *               region_id:
 *                 type: string
 *                 description: The ID of the region associated with the wishlist name.
 *             required:
 *               - title
 *               - customer_id
 *               - region_id
 *     responses:
 *       201:
 *         description: Wishlist created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Success Insert Wishlist
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid request body
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               wishlist: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
/**
 * @swagger
 * /store/wishlist/{id}:
 *   delete:
 *     summary: Delete a wishlist name by ID
 *     tags: [WishlistName]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the wishlist name to delete
 *     responses:
 *       200:
 *         description: Wishlist deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist Deleted
 *       400:
 *         description: Bad request. Invalid or missing ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or missing id
 *       404:
 *         description: Wishlist or wishlist name not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid wishlistname id
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               wishlist: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
/**
 * @swagger
 * /store/wishlist/{id}:
 *   put:
 *     summary: Update a wishlist name by ID
 *     tags: [WishlistName]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the wishlist name to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the wishlist name
 *     responses:
 *       200:
 *         description: Wishlist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist Updated
 *       400:
 *         description: Bad request. Invalid or missing ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or missing id
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               wishlist: Unauthorized
 *       404:
 *         description: Wishlist not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid wishlist id
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist operations
 * /store/wishlist-item/{id}:
 *   delete:
 *     summary: Delete a wishlist item by ID
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the wishlist item to delete
 *     responses:
 *       200:
 *         description: Wishlist item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist Item Deleted
 *       400:
 *         description: Bad request. Invalid or missing ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or missing id
 *       404:
 *         description: Wishlist item or wishlist name not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist Item Not Found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               wishlist: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
/**
 * @swagger
 * /store/wishlist/{wishlist_name_id}/wishlist-item:
 *   post:
 *     summary: Add an item to a wishlist
 *     tags: [Wishlist]
 *     description: Add a new item to a specific wishlist.
 *     parameters:
 *       - in: path
 *         name: wishlist_name_id
 *         required: true
 *         description: The ID of the wishlist.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product to add to the wishlist.
 *               variant_id:
 *                 type: string
 *                 description: The ID of the product variant to add to the wishlist.
 *             required:
 *               - product_id
 *               - variant_id
 *     responses:
 *       201:
 *         description: Wishlist item added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Success Insert Wishlist Item
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid or missing wishlist_name_id
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               wishlist: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 * /admin/{customer_id}/wishlist:
 *   get:
 *     summary: Get wishlist for a specific customer (admin access required)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyXzAxSERWUUJTVkFUNU1KUUROMFZCTjFWREhDIiwiZG9tYWluIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTIyNTIsImV4cCI6MTcwMDAzODY1Mn0.73srPqiCkOnfSjbGZ5Tngs1V5hLr1a51RXBVYMKba2M"]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the customer to get the wishlist for
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               wishlist:
 *                 - id: wishlistName_01HFEEFWVNCFZ5BR5TCS17P5GX
 *                   title: Alvika Tampan Wishlist
 *                   customer_id: cus_01HDVRJGHMVDAMWT73KKHSR9T2
 *                   region_id: reg_01HDVQ9V8R4FZ0Q2SBF6VN909E
 *                   region:
 *                     id: reg_01HDVQ9V8R4FZ0Q2SBF6VN909E
 *                     name: NA
 *                     currency_code: usd
 *                     # Add other region properties here
 *                   wishlists:
 *                     - id: wishlist_01HFGF5VMCSX2XBY38CNFPNVXG
 *                       product_id: prod_01HFDWK6MP832PJ2MRCSBES015
 *                       variant_id: variant_01HFDWK6PP1RXYF5P7BEXCBKQF
 *                       # Add other wishlist properties here
 *                       variant:
 *                         id: variant_01HFDWK6PP1RXYF5P7BEXCBKQF
 *                         title: Black / S
 *                         # Add other variant properties here
 *                         product:
 *                           id: prod_01HFDWK6MP832PJ2MRCSBES015
 *                           title: UNKL347 Jacket Hoodie Navy Model Simpel Bahan Fleece XOPA
 *                           # Add other product properties here
 *                           options:
 *                             - id: opt_01HFDWK6NN9BY1WN3PJME39X9Q
 *                               title: Color
 *                               # Add other option properties here
 *                               values:
 *                                 - id: optval_01HFDWK6PP9ZQ0H92PYDK6VBVM
 *                                   value: Black
 *                                   # Add other option value properties here
 *                             - id: opt_01HFDWK6NP1H45DD9MSN8C8008
 *                               title: Size
 *                               # Add other option properties here
 *                               values:
 *                                 - id: optval_01HFDWK6PPYR1FGE02FMAREZGR
 *                                   value: S
 *                                   # Add other option value properties here
 *                       # Add other wishlist properties here
 *                   # Add other wishlistName properties here
 *               # Add other response properties here
 *       400:
 *         description: Bad request. Invalid or missing customer_id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or missing customer_id
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *       401:
 *         description: Unauthorized. Admin access required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized. Admin access required.
 */





