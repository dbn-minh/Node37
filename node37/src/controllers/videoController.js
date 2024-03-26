// quản lý, thực hiện chức năng

// import Video from "../models/video.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";

import { responseData } from "../config/response.js";
import { decodeToken } from "../config/jwt.js";

let model = initModels(sequelize);
let Op = Sequelize.Op;

const getVideoPage = async (req, res) => {
    try {
        let { page } = req.params
        let pageSize = 3
        let index = (page - 1) * pageSize

        let dataCount = await model.video.count()
        let totalPage = Math.ceil(dataCount / pageSize) //lam tron

        // SELECT * FROM video LIMIT index, pageSize 
        let data = await model.video.findAll({
            offset: index,
            limit: pageSize
        })

        // {data, totalPage}
        responseData(res, "Get video page success", { data, totalPage }, 200);
    } catch (error) {
        responseData(res, "Get video page fail", null, 500);
    }
}

const getVideoByType = async (req, res) => {
    try {
        let { typeId } = req.params;

        let data = await model.video.findAll({
            where: {
                type_id: typeId,
            },
        });

        responseData(res, "Get video by type success", data, 200);
    } catch (error) {
        responseData(res, "Get video by type fail", null, 500);
    }
};

const getVideoType = async (req, res) => {
    try {
        let data = await model.video_type.findAll();

        responseData(res, "Get video type success", data, 200);
    } catch (error) {
        responseData(res, "Get video type fail", null, 500);
    }
};

const getVideo = async (req, res) => {
    try {
        let data = await model.video.findAll({
            include: [model.users, "type"]
        });

        responseData(res, "Get video success", data, 200);
    } catch (error) {
        responseData(res, "Get video fail", null, 500);
    }
};

const createVideo = (req, res) => {
    responseData(res, "Create video success", null, 200);
};

const getVideoId = async (req, res) => {
    try {
        // new Date()
        let { videoId } = req.params

        let dataPk = await model.video.findByPk(videoId)

        // object {}
        // JOIN 
        let data = await model.video.findOne({
            where: {
                video_id: videoId
            },
            // include: ["user"] // get all data from the FK
            include: [model.users, "type"]
        })
        responseData(res, "Get video id success", data, 200);

    } catch (error) {
        responseData(res, "Get video id fail", null, 500);
    }
};

const getCommentVideo = async (req, res) => {
    try {
        let { videoId } = req.params
        let data = await model.video_comment.findAll({
            where: {
                video_id: videoId
            },
            include: "user"
        })

        responseData(res, "Get video comment success", data, 200);
    } catch (error) {
        responseData(res, "Get video comment fail", null, 500);
    }
};

const commentVideo = async (req, res) => {
    try {
        //Lấy key để nhận biết được user nào 
        let { token } = req.headers
        // Giải mã => Object giống bên trang jwt.io
        let dToken = decodeToken(token)

        let { user_id } = dToken.data
        let { video_id, content } = req.body

        let newData = {
            user_id,
            video_id,
            content,
            date_create: new Date(),
            reply_list: "",
            timestamp: new Date()
        }

        await model.video_comment.create(newData)

        responseData(res, "Comment video success", null, 200);
    } catch (error) {
        responseData(res, "Comment video fail", null, 500);
    }



};


export { getVideo, createVideo, getVideoId, getVideoType, getVideoByType, getVideoPage, getCommentVideo, commentVideo };
