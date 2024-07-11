// 参考了这个：https://github.com/selaselah/bob-plugin-mathpix/blob/master/src/main.js
const { Buffer } = require('buffer'); // Import Buffer from the 'buffer' module

function supportLanguages() {
  return ['auto', 'en'];
}

function ocr(query, completion) {
  const { APP_ID, APP_Secret, rec_mode } = $option;
  const image_data = query.image;

  if (!APP_Secret) {
    completion({
      error: {
        type: "param",
        message: "未设置API Key",
      }
    });
    return;
  }

  const randomString = generateRandomString(16);
  const timestamp = Math.floor(Date.now() / 1000);
  let signature = `app-id=${APP_ID}&random-str=${randomString}&timestamp=${timestamp}&secret=${APP_Secret}`;
  var CryptoJS = require("crypto-js");
  signature = CryptoJS.MD5(signature);

  const headers = {
    "timestamp": timestamp.toString(), // 将 timestamp 转换为字符串
    "random-str": randomString,
    "app-id": APP_ID,
    "sign": signature.toString(CryptoJS.enc.Hex), // 将 signature 转换为字符串
    "rec_mode": rec_mode, // 添加 rec_mode 请求头
    "Content-Type": "multipart/form-data", // 设置请求头为multipart/form-data格式
  };
  const configs = {
    headers: headers,
  };

  let files = [{
    data: image_data,
    name: 'file',
    filename: 'image.jpg',
    "content-type": "image/jpeg"
  }];

  let res = $http.post({
    url: "https://server.simpletex.cn/api/simpletex_ocr",
    files: files,
    ...configs,
  });

  res.then((resp) => {
    const data = resp.data;
    completion({
      result: {
        from: data.res.type, // 假设识别结果为英文
        texts: [
          {
            text: data.res.info
          }
        ],
        raw: data // 将原始数据作为 raw 属性返回
      }
    });
  })
  .catch((error) => {
    completion({
      error: {
        type: "api",
        message: JSON.stringify(error)
      }
    });
  });

  return;
}

function generateRandomString(length) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
