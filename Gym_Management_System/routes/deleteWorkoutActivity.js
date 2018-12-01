const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;





   router.post("/", async (req, res) => {
       let activityId=req.body.activityId;
       console.log("DELETE BUTTON WORKING HERE: "+activityId);
       
       let user = req.body.username;
        console.log(user);

       console.log("This activityId"+activityId);
       

       let postActivity = await resultData.removeActivity(activityId);
    //    let username = req.body.username;
    //    console.log(username);
    //    let user = await userData.getUserByUsername("username " + username);
    //    console.log("user" +user);
    //    let userId=user._id;
    //    let postuserActivity = await resultData.removeUserActivity(userId,activityId);
        res.render("viewWorkoutActivity",{message:"Activity deleted successfully!"});
        
    // let activityId = req.body.aid;

    // console.log("Activity Id: "+activityId);
    

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