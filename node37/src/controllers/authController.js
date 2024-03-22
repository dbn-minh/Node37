import { responseData } from "../config/response.js"
import initModels from "../models/init-models.js"
import sequelize from "../models/connect.js"

let model = initModels(sequelize);


const login = (req, res) => {

}

const signUp = async (req, res) => {
    try {

        let { full_name, email, pass_word } = req.body

        let checkUser = await model.users.findOne({
            where: {
                email
            }
        })

        //Check trùng email
        if (checkUser) {
            // res.status(400).send("Email đã tồn tại")
            responseData(res, "Email đã tồn tại", null, 400)
            return
        }


        let newData = {
            full_name,
            email: email,
            pass_word, //còn gặp lại
            avatar: "",
            face_app_id: "",
            role: "user"
        }

        //Create => thêm mới users 
        //INSERT INTO VALUES
        await model.users.create(newData)

        responseData(res, "Đăng ký thành công", null, 200)

    } catch (error) {
        responseData(res, "Signup fail", null, 500);
    }
}

export {
    login,
    signUp
}