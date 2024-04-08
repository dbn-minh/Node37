import express from "express";
import cors from "cors";
import rootRoute from "./routes/rootRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// middle ware định vị thư mục load tài nguyên
app.use(express.static("."));

// graphql
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// muốn ko null thì thêm chấm thang
// [{productId, productName}, {productId, productName}, {productId, productName}]
// ["xyz", "abc"]
// [2, 5, 6, 2]

let schemaGraphql = buildSchema(`
  type User {
    user_id: ID
    full_name: String
    email: String
    avatar: String
    pass_word: String
    face_app_id: String
    role: String
    refresh_token: String
  }
  
  type VideoType {
    type_id: ID
    type_name: String
    icon: String
  }

  type Product {
    productId: ID
    productName: String
  } 

  type Video{
    video_id:      ID
    video_name:    String
    thumbnail:     String
    description:   String
    views:         Int
    source:        String
    user_id:       Int
    type_id:       Int
    users: User
    video_type: VideoType
  }

  type RootQuery {
    getUser: User
    getUserId( userId: Int ): User
    getVideo: [Video]
  }

  type RootMutation {
    createUser: String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }

`);

import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let resolver = {
  getVideo: async () => {
    let data = await prisma.video.findMany({
      include: {
        users: true,
        video_type: true,
      },
    });
    return data;
  },
  getUser: () => {
    let data = {
      id: 1,
      userName: "abc",
      age: 2,
      email: "abc@gmail.com",
      product: [
        {
          productId: 1,
          productName: "sp 1",
        },
      ],
    };
    return data;
  },
  getuserId: ({ userId }) => {
    let data = {
      id: userId,
      userName: "abc",
      age: 2,
      email: "abc@gmail.com",
      product: [
        {
          productId: 1,
          productName: "sp 1",
        },
      ],
    };
    return data;
  },
  createUser: () => {},
};

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

app.listen(8181);
// localhost:8080/video/get-video
app.use(rootRoute);

// yarn add sequelize
// lưu ý cài thêm thư viện của CSDL đó song song với sequelize

// yarn add  swagger-ui-express swagger-jsdoc
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

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
