import multer from "multer";

const storage = multer.diskStorage({
  destination: process.cwd() + "/public/imgs", //nơi định nghĩa đường dẫn lưu hình
  filename: (req, file, callback) => {
    let newName = new Date().getTime() + "_" + file.originalname; // meo.jpg
    //đổi tên hình
    callback(null, newName); //17000000000_meo.jpg
  },
});

let upload = multer({ storage });

export default upload;
