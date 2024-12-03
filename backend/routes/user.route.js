import express from "express"
import { createUsers, deleteUsers, getUsers, getUsersById, updateUsers } from "../controllers/user.controller.js";
import { adminOnly, verifyUser } from "../middleware/authuser.js";

const userRouter = express.Router();



userRouter.get("/get", verifyUser,adminOnly, getUsers);
userRouter.get("/get/:id",verifyUser,adminOnly,getUsersById);
userRouter.post("/create",verifyUser,adminOnly,createUsers);
userRouter.patch("/update/:id",verifyUser,adminOnly,updateUsers);
userRouter.delete("/delete/:id",verifyUser,adminOnly,deleteUsers);


export default userRouter;