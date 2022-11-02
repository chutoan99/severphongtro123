import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

const hashPassWord = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12)); // HASH PASSWORD

export const registerService = ({ phone, name, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone }, // tìm sdt này tồn tại hay chưa nếu chưa thì sẽ thực hiện defaults
        defaults: {
          id: v4(),
          name,
          phone,
          password: hashPassWord(password),
        },
      });
      // user chưa tồn tại thì sẽ đươc gán thêm tokem
      const token =
        response[1] &&
        jwt.sign(
          {
            id: response[0].id,
            phone: response[0].phone,
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "REGISTER IS SUCCESS"
          : "PHONE NUMBER  OR PASSWORD HAS BEEN ALDREADY USED !",
        token: token || null,
      });
    } catch (err) {
      reject(err);
    }
  });
export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone }, // tìm sdt này tồn tại trong database
        raw: true,
      });
      const isCorrectPassWord =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassWord &&
        jwt.sign(
          {
            id: response.id,
            phone: response.phone,
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "LOGIN IS SUCCESS"
          : response
          ? "PASSWORD IS WRONG"
          : "PHONE NUMBER  OR PASSWORD HAS BEEN ALDREADY USED !",
        token: token || null,
      });
    } catch (err) {
      reject(err);
    }
  });
