import moment from "moment";

const formDate = (timeObj) => {
  let day = timeObj.getDay() === 0 ? "Chủ nhật" : `thứ ${timeObj.getDay() + 1}`;
  let date = `${timeObj.getDate()}/${
    timeObj.getMonth() + 1
  }/${timeObj.getFullYear()}`;
  let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
  return `${day}, ${time} ${date}`;
};

const generaDate = () => {
  let gapExpire = Math.floor(Math.random() * 29) + 1;
  let today = new Date();
  let expireDay = moment(today).add(gapExpire, "d").toDate();
  return {
    today: formDate(today),
    expireDay: formDate(expireDay),
  };
};
export default generaDate;
