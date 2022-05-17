module.exports = class CustomErorr extends Error {
  constructor(err, code) {
    super(err);
    this.statusCode = code;
  }
};
