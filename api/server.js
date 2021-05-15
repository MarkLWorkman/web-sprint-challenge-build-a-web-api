const express = require("express");
const { logger, errorHandler } = require("./middleware/middleware");
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.use("/", (req, res) => {
  res.send("<h1>Lambda Web-Sprint-Challenge-Build-A-Web-Api</h1>");
});

server.use(errorHandler);

module.exports = server;
