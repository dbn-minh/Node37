import express from "express";
import cors from "cors";
import rootRoute from "./routes/rootRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// middle ware định vị thư mục load tài nguyên
app.use(express.static("."));

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

// 1. Set the DATA.BASE_URL in the .env file to point to your existing database.
//    If your database has no tables yet, read https://pris.ly/d/getting-started
// 2. Set the provider of the datasource block in schema.prisma to match your database:
//    postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
// 3. Run yarn prisma db pull to turn your database schema into a Prisma schema.
// 4. Run yarn prisma generate to generate the Prisma Client. You can then start quer
//    ing your database
