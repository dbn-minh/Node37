// yarn add jsonwebtoken
// 1. mã hoá dữ liệu
// 2. kiểm tra token hợp lệ
// 3. Giải token

import jwt from "jsonwebtoken"


//Tim hieu them ve Token nha Minh
const createToken = (data) => {
    let token = jwt.sign({ data }, "BIMAT", { algorithm: "HS256" })
    // hàm sign này nhận được 3 kiểu dữ liệu: buffer, chuỗi, object
    return token
}

const checkToken = () => {

}

const decodeToken = (token) => {
    return jwt.decode(token)
}

export { createToken, checkToken, decodeToken }