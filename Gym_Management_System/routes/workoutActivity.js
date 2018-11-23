const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;



router.get("/", (req, res) => {
 res.render("workoutActivity");

});

module.exports = router;