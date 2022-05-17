const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transaction Service", // Title of the documentation
      version: "1.0.0",
      description:
        "REST API that calculates the cashback for some transactions based on the rulesets provided", // short description of the application
    },
    servers: [
      {
        url: "http://localhost:5000", // local address on which application is running.
        description: "Local server",
      },
    ],
  },
  apis: ["./*.yaml"],
};

// initialize swagger-jsdoc
const specs = swaggerJSDoc(options);

module.exports = specs;
