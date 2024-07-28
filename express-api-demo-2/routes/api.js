var express = require("express");
var router = express.Router();

const apiController = require("../controllers/apiController");
router.use(express.json());

router.get("/", apiController.getApiHome);

module.exports = router;
