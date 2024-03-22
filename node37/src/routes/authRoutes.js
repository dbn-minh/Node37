//authentication
//authorization

import express from "express";
import { login, signUp } from "../controllers/authController.js";

const authRoute = express.Router()

//login
authRoute.post('/login', login)

//signup
authRoute.post('/signup', signUp)

export default authRoute