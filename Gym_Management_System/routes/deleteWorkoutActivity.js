const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;



router.get("/", (req, res) => {
 
    res.render("deleteWorkoutActivity");
   });

   router.post("/", async (req, res) => {
    let activityId = req.body.aid;

    console.log("Activity Id: "+activityId);
    let user = req.body.username;
    console.log(user);

    console.log(activityId); 
    if (!user) {
        res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide user",title:"workoutActivity"});
        return;
    }
    if (!activityId) {
        res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide activity id",title:"workoutActivity"});
        return;
    }
        let postcredentials = await resultData.removeActivity(activityId);
        
         let user2 = await userData.getUserByUsername(user);
         let userId = user2._id;
         console.log(userId);
         console.log(activityId);
         let postuserActivity = await resultData.removeUserActivity(userId,activityId);
         res.render("deleteworkoutActivity",{message:"Activity deleted successfully!"});
   });




module.exports = router;