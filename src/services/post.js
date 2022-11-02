import db from "../models";
import generateCode from "../utils/generateCode";
import { v4 as generateId } from "uuid";
import moment from "moment";
import { Op } from "sequelize";
import generaDate from "../utils/generateDate";
require("dotenv").config();
// GET ALL CATEGORY

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "password", "phone", "zalo"],
          },
        ],
        attributes: ["title", "start", "address", "description", "id"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get posts.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getPostsLimitService = (offset, query) =>
  new Promise(async (resolve, reject) => {
    try {
      // let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query };
      const response = await db.Post.findAll({
        where: queries,
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],

        offset: offset * +process.env.LIMIT || 0,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "password", "phone", "zalo"],
          },
        ],
        attributes: ["title", "start", "address", "description", "id"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get posts.",
        response: {
          count: response.length,
          page: offset || 0,
          rows: response,
        },
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewPostsService = (offset, query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        where: query,
        raw: true,
        order: [["createdAt", "DESC"]],
        nest: true,
        offset: 0,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "password", "phone", "zalo"],
          },
        ],
        attributes: [
          "title",
          "start",
          "address",
          "description",
          "id",
          "createdAt",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get posts.",
        response: {
          count: response.length,
          page: offset || 0,
          rows: response,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
export const createPostsService = (body, id) =>
  new Promise(async (resolve, reject) => {
    let attributesId = generateId();
    let imagesId = generateId();
    let overviewId = generateId();
    let labelCode = generateCode(body.label);
    const hashtag = `${Math.floor(Math.random() * Math.pow(10, 6))}`;
    const currentDate = generaDate();
    try {
      await db.Post.create({
        id: generateId(),
        attributesId,
        labelCode,
        imagesId,
        overviewId,
        title: body.title || null,
        start: 0,
        address: body.address || null,
        description: JSON.stringify(body.description) || null,
        userId: id,
        categoryCode: body.categoryCode,
        provinceCode: body.province.includes("Thành phố")
          ? generateCode(body?.province.replace("Thành phố", ""))
          : generateCode(body?.province.replace("Tỉnh", "")),
        areaCode: body.areaCode || null,
        priceCode: body.priceCode || null,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/tháng`
            : `${+body.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag: `#${hashtag}`,
      });

      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body?.images),
      });
      await db.Overview.create({
        id: overviewId,
        code: `#${hashtag}`,
        area: body.label,
        type: body.category,
        target: body.target,
        bonus: "Tin thường",
        created: currentDate.today,
        expired: currentDate.expireDay,
      });

      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            {
              value: body.province.replace("Thành phố", ""),
            },
            {
              value: body.province.replace("Tỉnh", ""),
            },
          ],
        },
        defaults: {
          code: body.province.includes("Thành phố")
            ? generateCode(body?.province.replace("Thành phố", ""))
            : generateCode(body?.province.replace("Tỉnh", "")),
          value: body.province.includes("Thành phố")
            ? body?.province.replace("Thành phố", "")
            : body.province.replace("Tỉnh", ""),
        },
      });
      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body?.label,
        },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to create posts.",
      });
    } catch (error) {
      reject(error);
    }
  });
export const getPostsLimitAminService = (query, id) =>
  new Promise(async (resolve, reject) => {
    const queries = { ...query, userId: id };
    try {
      const response = await db.Post.findAll({
        where: queries,
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "password", "phone", "zalo"],
          },
          {
            model: db.Overview,
            as: "overviews",
          },
        ],
        // attributes: ["title", "start", "address", "description", "id"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get postsAmin.",
        response: {
          count: response.length,
          rows: response,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
