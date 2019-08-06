const express = require("express");
const devControler = require("./controllers/DevController");
const likeController = require("./controllers/likeController");
const dislikeController = require("./controllers/dislikeController");

const routes = express.Router();

routes.get("/devs", devControler.index);
routes.post("/devs", devControler.store);
routes.post("/devs/:devId/likes", likeController.store);
routes.post("/devs/:devId/dislikes", dislikeController.store);

module.exports = routes;
