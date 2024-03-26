import express from "express";
import {
    createVideo,
    getVideo,
    getVideoId,
    getVideoType,
    getVideoByType,
    getVideoPage,
    getCommentVideo,
    commentVideo
} from "../controllers/videoController.js";

const videoRoute = express.Router();

// nơi quản lý API của đối tượng
videoRoute.get("/get-video", getVideo);
videoRoute.post("/create-video", createVideo);

// APT get video id
videoRoute.get("/get-video-id/:videoId", getVideoId);

// API get video type
videoRoute.get("/get-video-type", getVideoType);

// API lấy tất cả video theo type
videoRoute.get("/get-video-by-type/:typeId", getVideoByType);

// API get video pagination
videoRoute.get('/get-video-page/:page', getVideoPage)

// API get comment video
videoRoute.get('/get-comment-video/:videoId', getCommentVideo)

// API comment video
videoRoute.post('/comment-video', commentVideo)

export default videoRoute;
