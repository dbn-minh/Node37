import express from "express";
import cors from "cors";
import rootRoute from "./routes/rootRoutes.js";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cors());

// middle ware định vị thư mục load tài nguyên
app.use(express.static("."));

const httpServer = createServer(app);

// Đối tượng socket server
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
let number = 0;

io.on("connection", (socket) => {
  // đối tượng socket client
  // console.log(socket.id);

  //server gửi đi tất cả client
  io.emit("fe-connect", socket.id);
  socket.on("number-be", () => {
    io.emit("fe-number", number++);
  });
});

// graphql
import { graphqlHTTP } from "express-graphql";
import { schemaGraphql } from "./graphql/schema.js";
import { resolver } from "./graphql/resolver.js";

// localhost:8181/api
app.use(
  "/api",
  graphqlHTTP({
    schema: schemaGraphql, // nơi khai báo đối tượng (tên model, tên hàm)
    rootValue: resolver, // gán dữ liệu vào các hàm được khai báo ở schema
    graphiql: true,
  })
);

// end graphql

httpServer.listen(8181);
// app.listen(8181);
// localhost:8080/video/get-video
app.use(rootRoute);

// yarn add sequelize
// lưu ý cài thêm thư viện của CSDL đó song song với sequelize

// yarn add  swagger-ui-express swagger-jsdoc
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Socket } from "dgram";
import { log } from "console";

const options = {
  definition: {
    info: {
      title: "api node 37",
      version: "1.0.0.0.0.0.0.0.0.0",
    },
  },
  apis: ["src/swagger/index.js"],
};

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

// setup prisma
// 1/ yarn add prisma @prisma/client
// 2/ yarn prisma init
// 3/ cập nhật lại chuỗi kết nối db trong .env và tên hệ CSDL đang sử dụng trong schema.prisma

// 3. Run yarn prisma db pull to turn your database schema into a Prisma schema.

// 4. Run yarn prisma generate để cập nhật model trong @prisma/client
//  yarn prisma migrate dev -> backup database nhưng xóa hết dữ liệu
