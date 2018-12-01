const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;



router.get("/", async(req, res) => {
   
    let users = await userData.getAllUsers();
    
    res.render("viewWorkoutActivity",{
       
        username:users
    });
   });

   router.post("/", async (req, res) => {

    let userId = req.body.username;
    console.log(userId);
    if (!userId) {
        res.render("viewWorkoutActivity", { flag: 1, message: "Please provide userId",title:"viewWorkoutActivity"});
        return;
    }


     let activityIds = await resultData.getAllUserActivitiesId(userId);
     console.log("length " +activityIds);
      
      if(!activityIds){
       res.render("viewWorkoutActivity", { flag: 1, message: "No activities for this user",title:"viewWorkoutActivity"});
        return;
      }
       let activityArray = [];
     for(let i = 0 ; i<activityIds.length; i++){
      activity =await resultData.getAllActivities(activityIds[i]);
      activityArray.push(activity);
      console.log("activityhere:" +activityArray);
      }
    let users = await userData.getAllUsers();
     res.render("viewWorkoutActivity",{showactivities: activityArray,username:users});
   });
module.exports = router;