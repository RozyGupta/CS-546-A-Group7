const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;


// const checkRole = async function (req, res, next) {
//     let loggedInUser = await userData.getUserByUsername(user);
//     let role = await loggedInUser.role;
//     console.log(role);
//     if(role === "admin" || role === "Trainer"){
//         res.next();
//     }
//     else{
//         res.render("error",{error: "Unauthorized user"});
//     }
// };
router.get("/", (req, res) => {
    res.render("addWorkoutActivity");
   });

   router.post("/", async (req, res) => {
    let activity = req.body.activity;
    let weight = req.body.weight;
    let repetitions = req.body.repetitions;
    let user = req.body.username;

    if (!user) {
        res.render("addWorkoutActivity", { flag: 1, message: "Please provide user",title:"workoutActivity"});
        return;
    }
     if (!activity) {
         res.render("addWorkoutActivity", { flag: 1, message: "Please provide activity",title:"workoutActivity" });
         return;
     }
     if (!weight) {
         res.render("addWorkoutActivity", { flag: 1, message: "Please provide weight",title:"workoutActivity"});
         return;
     }
     if (!repetitions) {
        res.render("addWorkoutActivity", { flag: 1, message: "Please provide repetitions",title:"workoutActivity"});
        return;
    }
    
         
         let postcredentials = await resultData.addActivity(activity, weight,repetitions);
         let acitivityId= postcredentials.newId;
         let user1 = await userData.getUserByUsername(user);
         let userId = user1._id;
         let postuserActivity = await resultData.addUserActivity(userId,acitivityId);


         
    res.render("addworkoutActivity",{message:"Activity added successfully!"});
 });



   module.exports = router;