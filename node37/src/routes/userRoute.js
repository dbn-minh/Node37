import express from "express";
import { getInfo, getUser, updateInfo } from "../controllers/userController.js";

const userRoute = express.Router();

// Refresh Token => làm mới lại token

// API get video pagination
userRoute.get("/get-user", getUser);

// API get info user
userRoute.get("/get-info", getInfo);

// API update info user
userRoute.put("/update-info", updateInfo);

// API upload avatar
// yarn add multer

import multer from "multer";

const storage = multer.diskStorage({
  destination: process.cwd() + "/public/img", //nơi định nghĩa đường dẫn lưu hình
  filename: (req, file, callback) => {
    let newName = new Date().getTime() + "_" + file.originalname; // meo.jpg
    //đổi tên hình
    callback(null, newName); //17000000000_meo.jpg
  },
});

let upload = multer({ storage });

userRoute.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  //form-data
  let { file } = req;
  let { hoTen, email } = req.body;

  //  /public/img/${file.filename}
  res.send(file);
});

export default userRoute;

// localhost:8080/user/get-user
