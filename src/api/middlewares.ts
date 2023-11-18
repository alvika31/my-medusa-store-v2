import type { MiddlewaresConfig } from "@medusajs/medusa"
import type { 
  MedusaNextFunction, 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa"

const storeMiddleware = (
  req: MedusaRequest, 
  res: MedusaResponse, 
  next: MedusaNextFunction
) => {
  // do something
  next()
}

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/store/*",
      middlewares: [storeMiddleware],
    },
  ],
}