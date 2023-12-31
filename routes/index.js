const express = require("express");

const router = express.Router();
const homeController = require("../controller/home_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./post"));
router.use("/comments", require("./comments"));
router.use('/api',require('./api'));

//for any further routes,access from here
//router.use('/routerName',require('./routerfile));

module.exports = router;
