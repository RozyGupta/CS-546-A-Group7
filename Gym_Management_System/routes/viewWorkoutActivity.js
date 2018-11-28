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
    console.log("username"+req.body.username);
    let username = req.body.username;
    if (!username) {
        res.render("viewWorkoutActivity", { flag: 1, message: "Please provide username",title:"viewWorkoutActivity"});
        return;
    }
   
    //    let user = await userData.getUserByUsername(username);
    //    let userId = user._id;
       let activityIds = await resultData.getAllActivitiesById(username);
       console.log("aid"+ activityIds);

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
           
        let users = await userData.getAllUsers();
        let activityId=req.body.activityId
         res.render("viewWorkoutActivity",{showactivities: activities,username:users});
   });


   router.post("/delete", async (req, res) => {
    let activityId=req.body;
    console.log("activityId"+activityId);
    if (!activityId) {
         res.render("viewWorkoutActivity", {  message: "Please provide activity id",title:"workoutActivity"});
         return;
     }

    let postuserActivity = await resultData.removeActivity(activityId);
     res.render("viewWorkoutActivity",{message:"Activity deleted successfully!"});
 // let activityId = req.body.aid;

 // console.log("Activity Id: "+activityId);
 // let user = req.body.username;
 // console.log(user);

 // console.log(activityId); 
 // if (!user) {
 //     res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide user",title:"workoutActivity"});
 //     return;
 // }
 // if (!activityId) {
 //     res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide activity id",title:"workoutActivity"});
 //     return;
 // }
 //     let postcredentials = await resultData.removeActivity(activityId);
     
 //      let user2 = await userData.getUserByUsername(user);
 //      let userId = user2._id;
 //      console.log(userId);
 //      console.log(activityId);
 //      let postuserActivity = await resultData.removeUserActivity(userId,activityId);
 //      res.render("deleteworkoutActivity",{message:"Activity deleted successfully!"});
});
module.exports = router;