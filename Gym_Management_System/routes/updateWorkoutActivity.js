const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;

   router.post("/", async (req, res) => {
   
    let activityToUpdate = req.body;
    let activityId = activityToUpdate.activityId;
    let level = activityToUpdate.activitylevel;
    let description = activityToUpdate.activitydescription;
    let startdate = activityToUpdate.activitystartdate;
    let enddate = activityToUpdate.activityenddate;
    let days = activityToUpdate.days;
    let activity = activityToUpdate.activity;
    let sets = activityToUpdate.sets;
    let weight = activityToUpdate.weight;
    let repetitions = activityToUpdate.repetitions;
    let updatedActivity = await resultData.updateActivity(activityId,level,description,startdate,enddate,days,activity,sets,weight,repetitions);
    let users = await userData.getAllUsers();
    
    res.render("viewWorkoutActivity",{message:"Activity updated Successfully",title: "viewWorkoutActivity",username:users})
 
});
   module.exports = router;