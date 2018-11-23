const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.addWorkoutActivity;
const userData = data.user;



router.get("/", (req, res) => {
    res.render("addWorkoutActivity");
   });

   router.post("/", async (req, res) => {
    let activity = req.body.activity;
    let weight = req.body.weight;
    let repetitions = req.body.repetitions;
    let user = req.body.username;
    console.log(activity);
     if (!activity) {
         res.render("addWorkout", { flag: 1, message: "Please provide activity",title:"workoutActivity" });
         return;
     }
     if (!weight) {
         res.render("addWorkout", { flag: 1, message: "Please provide weight",title:"workoutActivity"});
         return;
     }
     if (!repetitions) {
        res.render("addWorkout", { flag: 1, message: "Please provide repetitions",title:"workoutActivity"});
        return;
    }
     
         
         let postcredentials = await resultData.addActivity(activity, weight,repetitions);
         let acitivityId= postcredentials.newId;
         let user1 = await userData.getUserByUsername(user);
         console.log(user1);
         let userId = user1._id;
         console.log(userId);
         let postuserActivity = await resultData.addUserActivity(userId,acitivityId);


         
    res.redirect("/addWorkoutActivity");
 });



   module.exports = router;