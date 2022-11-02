import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";
import timnguoioghep from "../../data/timnguoioghep.json";
import generateCode from "./generateCode";
const prices = [
  {
    min: 0,
    max: 1,
    value: "Dưới 1 triệu",
  },
  {
    min: 1,
    max: 2,
    value: "Từ 1 - 2 triệu",
  },
  {
    min: 2,
    max: 3,
    value: "Từ 2 - 3 triệu",
  },
  {
    min: 3,
    max: 5,
    value: "Từ 3 - 5 triệu",
  },
  {
    min: 5,
    max: 7,
    value: "Từ 5 - 7 triệu",
  },
  {
    min: 7,
    max: 10,
    value: "Từ 7 - 10 triệu",
  },
  {
    min: 10,
    max: 15,
    value: "Từ 10 - 15 triệu",
  },
  {
    min: 15,
    max: 999999,
    value: "Trên 15 triệu",
  },
];
const areas = [
  {
    min: 0,
    max: 20,
    value: "Dưới 20m",
  },
  {
    min: 20,
    max: 30,
    value: "Từ 20m - 30m",
  },
  {
    min: 30,
    max: 50,
    value: "Từ 30m - 50m",
  },
  {
    min: 50,
    max: 70,
    value: "Từ 50m - 70m",
  },
  {
    min: 70,
    max: 90,
    value: "Từ 70m - 90m",
  },
  {
    min: 90,
    max: 9999999,
    value: "Trên 90m",
  },
];
export const dataPrice = prices.map((item) => ({
  ...item,
  code: generateCode(item.value),
}));
export const dataArea = areas.map((item) => ({
  ...item,
  code: generateCode(item.value),
}));

export const categories = [
  { code: "CTCH", value: "Cho Thuê Căn Hộ", content: chothuecanho.header },
  { code: "CTMB", value: "Cho Thuê Mặt Bằng", content: chothuematbang.header },
  {
    code: "CTPT",
    value: "Cho Thuê Phòng Trọ",
    content: chothuephongtro.header,
  },
  { code: "NCT", value: "Nhà cho thuê", content: nhachothue.header },
  { code: "TNOG", value: "Tìm Người Ở Ghép", content: timnguoioghep.header },
];
export const data = [
  {
    code: "CTCH",
    content: chothuecanho.body,
  },
  {
    code: "CTMB",
    content: chothuematbang.body,
  },
  {
    code: "CTPT",
    content: chothuephongtro.body,
  },
  {
    code: "NCH",
    content: nhachothue.body,
  },
  {
    code: "TNOG",
    content: timnguoioghep.body,
  },
];
