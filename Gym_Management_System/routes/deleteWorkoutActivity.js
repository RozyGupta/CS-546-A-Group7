const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;



router.get("/", (req, res) => {
    res.render("deleteWorkoutActivity");
   });

   router.post("/", async (req, res) => {
    let user = req.body.username;
    console.log(user);
    let activityId = req.body.id;
    console.log(activityId);
    if (!user) {
        res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide user",title:"workoutActivity"});
        return;
    }
    if (!activityId) {
        res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide id",title:"workoutActivity"});
        return;
    }
        let postcredentials = await resultData.removeActivity(activityId);
        
         let user2 = await userData.getUserByUsername(user);
         let userId = user2._id;
         console.log(userId);
         console.log(activityId);
         let postuserActivity = await resultData.removeUserActivity(userId,activityId);
         res.redirect("/workoutActivity");
   });




module.exports = router;