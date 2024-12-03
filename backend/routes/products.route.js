import express from 'express'
import { createProducts, deleteProducts, getProducts, getProductsById, updateProducts } from '../controllers/product.controller.js';
import { verifyUser } from '../middleware/authuser.js';

const productRouter = express.Router();

productRouter.get("/get",verifyUser,  getProducts);
productRouter.get("/get/:id",verifyUser,getProductsById);
productRouter.post("/create",verifyUser,createProducts);
productRouter.patch("/update/:id" ,verifyUser, updateProducts);
productRouter.delete("/delete/:id" ,verifyUser, deleteProducts);


export default productRouter;