import { responseData } from "../config/response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

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
      if (checkUser.pass_word == pass_word) {
        responseData(res, "Login success", "token", 200);
      } else {
        responseData(res, "Wrong password", null, 400);
      }
    } else {
      //doesn't exist => login fail
      responseData(res, "Wrong email", null, 400);
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
      email: email,
      pass_word, //còn gặp lại
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

export { login, signUp };
