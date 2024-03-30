import express from "express";
import { getUser } from "../controllers/userController.js";

const userRoute = express.Router();

// Refresh Token => làm mới lại token

// API get video pagination
userRoute.get("/get-user", getUser);

export default userRoute;

//localhost:8181/user/get-user
