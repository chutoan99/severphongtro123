import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import initRoutes from "./src/routes/index";
import connectDataBase from "./src/config/connectDataBase";
import router from "./src/routes/auth";
// các  cấu hình
dotenv.config();
const app = express();
app.use(express.json()); // đọc được các dữ liệu dạng json được gửi từ client
app.use(express.urlencoded({ extended: true })); // đọc các data từ body
app.use(cors());
// các  cấu hình
connectDataBase();
initRoutes(app); // cấu hình routes

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log("server is running" + port);
}); // chạy server
