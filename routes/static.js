var express = require("express");
var router = express.Router();

// Controllers
const static_controller = require("../controllers/staticController");

// INDEX ROUTE
router.get("/", static_controller.index);

router.get("/about-us", static_controller.about_us);

module.exports = router;