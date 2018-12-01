const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.activity;


router.get("/", (req, res) => {
    res.render("updateActivity");
});


router.post("/", async (req, res) => {
 
    let activity= await resultData.getAllActivities();
    console.log(activity);
    let activityid = activity._id;
    let everyactivity = await resultData.getActivityById(activityid);
    console.log(everyactivity);
 
});

   module.exports = router;