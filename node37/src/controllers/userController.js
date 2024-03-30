import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

let model = initModels(sequelize);

const getUser = async (req, res) => {
  try {
    let data = await model.users.findAll();

    responseData(res, "Success", data, 200);
  } catch (error) {
    responseData(res, "Error", null, 500);
  }
};

export { getUser };
