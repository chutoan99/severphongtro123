import { v4 } from "uuid";
import db from "../models";
import bcrypt from "bcryptjs";
require("dotenv").config();
import generateCode from "../utils/generateCode";
import { dataPrice, dataArea, categories, data } from "../utils/data";
import { getNumberFromString, getNumberFromStringV2 } from "../utils/comom";

const hashPassWord = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12)); // HASH PASSWORD

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      data.map(async (dataBody) => {
        const provinceCodes = [];
        const labelCodes = [];
        dataBody.content.forEach(async (item) => {
          // tạo và kiểm tra labelCode
          let labelCode = generateCode(item?.header?.class?.classType).trim();
          labelCodes?.every((item) => item?.code !== labelCode) &&
            labelCodes.push({
              code: generateCode(item?.header?.class?.classType).trim(),
              value: item?.header?.class?.classType?.trim(),
            });
          // tạo và kiểm tra provinceCode
          let provinceCode = generateCode(
            item?.header?.address.split(",").slice(-1)[0].trim()
          );
          provinceCodes?.every((item) => item?.code !== provinceCode) &&
            provinceCodes.push({
              code: generateCode(
                item?.header?.address.split(",").slice(-1)[0].trim()
              ),
              value: item?.header?.address?.split(",")?.slice(-1)[0].trim(),
            });
          let postId = v4();
          let attributesId = v4();
          let userId = v4();
          let imagesId = v4();
          let overviewId = v4();
          let currentArea = getNumberFromString(
            item?.header?.attributes?.acreage
          );
          let currentPrice = getNumberFromString(
            item?.header?.attributes?.price
          );
          let description = JSON.stringify(item?.mainContent?.content);

          // bắt đầu tạo bảng
          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            start: item?.header?.star,
            address: item?.header?.address,
            description: description,
            userId: userId,
            labelCode: labelCode,
            provinceCode: provinceCode,
            categoryCode: dataBody.code,
            attributesId: attributesId,
            overviewId: overviewId,
            imagesId: imagesId,
            areaCode: dataArea.find(
              (area) => area.max > currentArea && area.min <= currentArea
            )?.code,
            priceCode: dataPrice.find(
              (area) => area.max > currentPrice && area.min <= currentPrice
            )?.code,
            priceNumber: getNumberFromStringV2(item?.header?.attributes?.price),
            areaNumber: getNumberFromStringV2(
              item?.header?.attributes?.acreage
            ),
          });
          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });
          // tìm xem tong dada có labelCode nào giống nhau không , nếu không thì sẽ tạo mới
          await db.Image.create({
            id: imagesId,
            image: JSON.stringify(item?.images),
          });
          await db.Overview.create({
            id: overviewId,
            code: item?.overview?.content.find((i) => i.name === "Mã tin:")
              ?.content,
            area: item?.overview?.content.find((i) => i.name === "Khu vực")
              ?.content,
            type: item?.overview?.content.find(
              (i) => i.name === "Loại tin rao:"
            )?.content,
            target: item?.overview?.content.find(
              (i) => i.name === "Đối tượng thuê:"
            )?.content,
            bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
              ?.content,
            created: item?.overview?.content.find(
              (i) => i.name === "Ngày đăng:"
            )?.content,
            expired: item?.overview?.content.find(
              (i) => i.name === "Ngày hết hạn:"
            )?.content,
          });
          await db.User.create({
            id: userId,
            name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
              ?.content,
            password: hashPassWord("123456"),
            phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
              ?.content,
            zalo: item?.contact?.content.find((i) => i.name === "Zalo")
              ?.content,
          });
          provinceCodes.forEach(async (item) => {
            await db.Province.create({
              code: item?.code,
              value: item?.value,
            });
          });
          labelCodes.forEach(async (item) => {
            await db.Label.create({
              code: item?.code,
              value: item?.value,
            });
          });
          resolve("done..");
        });
      });
      dataArea.forEach(async (area, index) => {
        await db.Area.create({
          order: index + 1,
          code: area?.code,
          value: area?.value,
        });
      });
      dataPrice.forEach(async (price, index) => {
        await db.Price.create({
          order: index + 1,
          code: price?.code,
          value: price?.value,
        });
        resolve("ok");
      });
      categories.map(
        async (item) =>
          await db.Category.create({
            code: item?.code,
            value: item?.value,
            header: item?.content?.title,
            subHeader: item?.content?.description,
          })
      );
    } catch (error) {
      reject(error);
    }
  });
