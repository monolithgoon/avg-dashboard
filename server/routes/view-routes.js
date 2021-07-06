`use strict`
const express = require("express");
const router = express.Router();
const viewsController = require("../controllers/view-controller.js");
const dataController = require("../controllers/data-controller.js");
const authController = require("../controllers/auth-controller.js");

router.get("/", viewsController.renderLandingPage);
router.get("/landing", viewsController.renderLandingPage);

// affixes the currently logged-in user to res.locals
router.use(authController.isLoggedIn);

router.route("/dashboard")
      .get(dataController.getClustersData, authController.protectRoute, authController.restrictTo(`manager`, `admin`), viewsController.renderAVGDashboard)
      
module.exports = router;