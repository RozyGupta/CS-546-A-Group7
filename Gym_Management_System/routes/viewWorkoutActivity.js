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
    let username = req.body.username;
    if (!username) {
        res.render("viewWorkoutActivity", { flag: 1, message: "Please provide username",title:"viewWorkoutActivity"});
        return;
    }
   
       let activityIds = await resultData.getAllActivitiesById(username);

       if(!activityIds){
           let users = await userData.getAllUsers();
        res.render("viewWorkoutActivity", { flag: 1, message: "There are no activities for this user",title:"viewWorkoutActivity",username:users});
       return;
    }
       let activities = [];
       let activity = null;
        for(let i = 0 ; i<activityIds.length; i++){
            activity =await resultData.getAllActivities(activityIds[i]);
           
           let obj = activity.pop([i])
           activities.push(obj);
        }
           
        let users = await userData.getAllUsers();
        let activityId=req.body.activityId
         res.render("viewWorkoutActivity",{showactivities: activities,username:users});
   });
module.exports = router;