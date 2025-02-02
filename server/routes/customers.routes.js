import express from "express";
import { PaymentController, braintreeTokenController, getSingleProductController, searchProductController, totalrevenue } from "../controllers/customers.controller.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/get-product/:id', getSingleProductController);

router.get('/search/:keyword', searchProductController);

router.post("/payment",requireSignIn, PaymentController);

router.get("/braintree/token", braintreeTokenController);

router.post("/total-revenue", totalrevenue);

export default router;