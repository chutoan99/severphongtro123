import db from "../models";
require("dotenv").config();

export const getOneService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        attributes: ["name", "id", "phone", "zalo"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
