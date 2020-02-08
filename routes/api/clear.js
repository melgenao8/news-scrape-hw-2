var router = require("express").Router();
var clearController = require("../../controllers/clear");

router.get("/", clearController.clearDB);

module.exports = router;
