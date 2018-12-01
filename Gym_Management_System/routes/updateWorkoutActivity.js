const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;


router.get("/", (req, res) => {
    res.render("updateWorkoutActivity");
   });


   router.post("/", async (req, res) => {
    let username = req.body.username;
    console.log(username);

  
    let activityToUpdate = req.body;
    console.log("activityToUpdate: " + activityToUpdate)
    let activityId = activityToUpdate.activityId;
    let level = activityToUpdate.activitylevel;
    let description = activityToUpdate.activitydescription;
    let startdate = activityToUpdate.activitystartdate;
    let enddate = activityToUpdate.activityenddate;
    let days = activityToUpdate.activitydays;
    let activity = activityToUpdate.activity;
    let sets = activityToUpdate.activitysets;
    let weight = activityToUpdate.activityweight;
    let repetitions = activityToUpdate.activityrepetitions;
    console.log(activityId);
    console.log(level);
    console.log(description);
    console.log(startdate);
    console.log(enddate);
    console.log(days);
    console.log(activity);
    console.log(sets);
    console.log(weight);
    console.log(repetitions);
    
    
   //  let user = await userData.getUserByUsername(username);

    
   //  console.log(user);
   //  let userId =user._id;
   //  console.log(userId);
   //  let activityId= await resultData.getAllActivitiesById(userId);
   //  console.log(activityId);
   //  let activity = req.body.activityId;
   //  let useractivity = await resultData.getActivityById(activity);
   //  console.log(useractivity);
   //  let activityContent = await resultData.getAllActivities(useractivity);
   //  console.log(activityContent);
    
});
   module.exports = router;