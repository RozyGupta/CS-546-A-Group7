const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;



router.get("/", async(req, res) => {
    let arr=[{name:"ab"},{name:"c"},{name:"dsa"}];
    console.log(arr);
    let users = await userData.getAllUsers();
    console.log(users);
    res.render("viewWorkoutActivity",{
        try:"trail",
        username:arr
    });
   });

   router.post("/", async (req, res) => {
    let username = req.body.username;
    let row = req.body.delete;
    console.log("this is " + row);
   
   
    
    if (!username) {
        res.render("viewWorkoutActivity", { flag: 1, message: "Please provide username",title:"viewWorkoutActivity"});
        return;
    }
   
       let user = await userData.getUserByUsername(username);
       let userId = user._id;
       let activityIds = await resultData.getAllActivitiesById(userId);
       let activities = [];
       let activity = null;
        for(let i = 0 ; i<activityIds.length; i++){
            activity =await resultData.getAllActivities(activityIds[i]);
           
           let obj = activity.pop([i])
           activities.push(obj);
        }
           
       
    
        
         res.render("viewWorkoutActivity",{showactivities: activities,username:activities});
   });


   



module.exports = router;