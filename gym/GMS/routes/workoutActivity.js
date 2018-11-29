const express = require("express");
const router = express.Router();



router.get("/", async(req, res) => {
res.render("workoutActivity");



});



module.exports = router;