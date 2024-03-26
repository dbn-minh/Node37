import { responseData } from "../config/response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

import bcrypt from "bcrypt";
import { createToken } from "../config/jwt.js";

let model = initModels(sequelize);

const login = async (req, res) => {
  try {
    let { email, pass_word } = req.body;

    //Check email and password = table user
    // SELECT * FROM users WHERE email=email, pass_word=pass_word
    // if (email==email && pass_word==pass_word)

    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });


    // exist => login success
    if (checkUser) {
      if (bcrypt.compareSync(pass_word, checkUser.pass_word)) {

        let token = createToken({ user_id: checkUser.user_id });

        responseData(res, "Login success", token, 200);
      } else {
        responseData(res, "Invalid password", null, 400);
      }
    } else {
      //doesn't exist => login fail
      responseData(res, "Invalid email", null, 400);
    }
  } catch (error) {
    responseData(res, "Login fail", null, 500);
  }
};

const signUp = async (req, res) => {
  try {
    let { full_name, email, pass_word } = req.body;

    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    //Check trùng email
    if (checkUser) {
      // res.status(400).send("Email đã tồn tại")
      responseData(res, "Email existed", null, 400);
      return;
    }

    let newData = {
      full_name,
      email,
      pass_word: bcrypt.hashSync(pass_word, 10), //còn gặp lại
      avatar: "",
      face_app_id: "",
      role: "user",
    };

    //Create => thêm mới users
    //INSERT INTO VALUES
    await model.users.create(newData);

    responseData(res, "Signup success", null, 200);
  } catch (error) {
    responseData(res, "Signup fail", null, 500);
  }
};

const loginFacebook = async (req, res) => {
  try {
    let { faceAppId, full_name } = req.body;

    //check  Facebook app id
    let checkUser = await model.users.findOne({
      where: {
        face_app_id: faceAppId,
      },
    });

    // if exited => login
    if (!checkUser) {
      let newData = {
        full_name,
        email: "",
        pass_word: "", //còn gặp lại
        avatar: "",
        face_app_id: faceAppId,
        role: "user",
      };
      await model.users.create(newData);
    }
    responseData(res, "Login Facebook success", "token", 200);
  } catch (error) {
    responseData(res, "Login Facebook fail", null, 500);
  }
};

export { login, signUp, loginFacebook };
