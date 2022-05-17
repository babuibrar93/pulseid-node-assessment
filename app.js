//Modules for the server setup
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUIExpress = require("swagger-ui-express");

const Error = require("./src/middlewares/Error");
const routes = require("./src/routes");
const specs = require("./src/swagger/documentation");

(async () => await require("./src/db/mongoose")())();

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", routes);
app.use(Error);

app.use("/api-docs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

// fallback route for not found
app.use("*", (req, res, next) =>
  res.status(404).send({ status: false, message: "Not found" })
);

module.exports = app;
