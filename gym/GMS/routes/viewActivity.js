const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.activity;

router.get("/", async(req, res) => {
   
    let activity= await resultData.getAllActivities();
    
    res.render("viewActivity",{activity:activity});
   });

   router.post("/", async (req, res) => {
    console.log("activity"+req.body.activity);
    let activityIds = req.body.activity;

       if(!activityIds){
           console.log(activityIds);
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
           
        
         res.render("viewActivity",{showactivities: activities});
   });


   router.post("/delete", async (req, res) => {
    let activityId=req.body;
    console.log("activityId"+activityId);
    if (!activityId) {
         res.render("viewWorkoutActivity", {  message: "Please provide activity id",title:"workoutActivity"});
         return;
     }

    let postuserActivity = await resultData.removeActivity(activityId);
     res.render("viewActivity",{message:"Activity deleted successfully!"});

});
module.exports = router;