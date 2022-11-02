export const formatArr = (response) => {
  var duplicateArr = [];
  var finalArray = [];
  response.forEach(function (item) {
    var combinedStr = item.code + "," + item.value;
    if (duplicateArr.indexOf(combinedStr) < 0) {
      duplicateArr.push(combinedStr);
      finalArray.push(item);
    }
  });
  return finalArray;
};
