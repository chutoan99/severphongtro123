import db from "../models";
require("dotenv").config();
// GET ALL CATEGORY
export const getAreaService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Area.findAll({});
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get area.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
