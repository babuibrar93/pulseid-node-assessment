module.exports = (body, requiredFields) =>
  requiredFields
    .filter((field) => !body[field])
    .map((field) => `${field} is required.`);
