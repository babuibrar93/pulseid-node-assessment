const mongoose = require("mongoose");

const config = require("config");

module.exports = () => {
  return new Promise((resolve, reject) => {
    const url = config.get("mongodb");
    if (!url) return reject("Invalid mongo url");

    mongoose.connect(url, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        reject(error);
      } else {
        resolve("Connected to MongoDB");
      }
    });
  });
};
