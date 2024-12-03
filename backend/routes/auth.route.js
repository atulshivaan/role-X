import express from "express"
import { login, logout, Me } from "../controllers/auth.controller.js";

const authRouter = express.Router();

 authRouter.get("/me",Me);
 authRouter.post("/login",login);
 authRouter.delete("/logout/:id",logout)

 export default authRouter;