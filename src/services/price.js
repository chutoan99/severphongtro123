import db from "../models";
require("dotenv").config();
// GET ALL CATEGORY
export const getPricesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findAll({});
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get prices.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
