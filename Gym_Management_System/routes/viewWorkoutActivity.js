const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;



router.get("/", (req, res) => {
    res.render("viewWorkoutActivity");
   });

   router.post("/", async (req, res) => {
    let username = req.body.username;
    console.log(username);
  
    if (!username) {
        res.render("viewWorkoutActivity", { flag: 1, message: "Please provide username",title:"viewWorkoutActivity"});
        return;
    }
   
       let user = await userData.getUserByUsername(username);
       let userId = user._id;
       let activityIds = await resultData.getActivityById(userId);
       let activities = [];
       let activity = null;
        for(let i = 0 ; i<activityIds.length; i++){
            activity =await resultData.getAllActivities(activityIds[i]);
           console.log(activity)
           let obj = activity.pop([i])
           activities.push(obj);
        }
           
       
    
        console.log(activities);
         res.render("viewWorkoutActivity",{showactivities: activities});
   });




module.exports = router;