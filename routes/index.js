var router = require("express").Router();
var apiRoutes = require("./api");
var viewRoutes = require("./view");

router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;
