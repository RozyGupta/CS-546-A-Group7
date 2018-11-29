const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;


router.get("/", (req, res) => {
    res.render("updateActivity");
   });

   router.post("/", async (req, res) => {
    let activityId= await resultData.getAllActivities(acitivityid);
    console.log(activityId);
    let activity = req.body.activityId;
    console.log(activity);
});
   module.exports = router;