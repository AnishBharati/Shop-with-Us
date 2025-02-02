import express from "express";
import {
  registerController,
  loginController,
  getOrdersController,
  updateProfileController,
  getCountCustomer,
  getCountOffSeasonProducts,
  getTotalRevenue,
  getProductCount,
} from "../controllers/customerauthController.js";
import {requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//orders
router.get("/orders", requireSignIn, getOrdersController);

//profile
router.put("/profile", requireSignIn, updateProfileController);

//count customers
router.get('/customer-count', getCountCustomer);

//count off season products
router.get('/off-season-products', getCountOffSeasonProducts);

//get total revenue
router.get('/total-revenue', getTotalRevenue);

//get total products
router.get('/total-product', getProductCount);
export default router;