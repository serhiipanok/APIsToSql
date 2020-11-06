const axios = require("axios");

const getData = async (type) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `https://ftx.com/api/${type}`,
      method: "GET",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  getData,
};
