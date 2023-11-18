
import express, { Router } from "express"
import wishlistRouters from "./store/wishlist/wishlist-routers";
import adminRouters from "./admin/custom/admin-routers";
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import path from 'path';
import cors from "cors";

export default (rootDirectory, options) => {
  const router = Router()
  const corsOptions = {
    origin: ['http://localhost:8000', 'http://localhost:7001'],
    credentials: true,
    optionSuccessStatus: 200
  };
  router.use(cors(corsOptions));
  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))

  wishlistRouters(router)
  adminRouters(rootDirectory, router)

  const optionsSwagger = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Documentation API Wishlist",
        version: "0.1.0",
        description:
          "This is a simple to understand API Wishlist",
      },
      servers: [
        {
          url: "http://localhost:9000",
        },
      ],
    },
    apis: [path.resolve(__dirname, './store/api-doc/*.ts')],
  };

  const specs = swaggerJsDoc(optionsSwagger);
  router.use(
    "/store/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

  return router
}