const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;

router.get("/", (req, res) => {
    res.render("updateWorkoutActivity");
   });

//    router.post("/", async (req, res) => {
//     let username = req.body.username;
//     console.log(username);
    
//     let user = await userData.getUserByUsername(username);
    
//     console.log(user);
//     let userId =user._id;
//     console.log(userId);
//     let activityId= await resultData.getActivityById(userId);
//     console.log(activityId);
//     let fieldToUpdate = req.body.field;
//     console.log(fieldToUpdate)
//     let value = req.body.newvalue;
//     let updatedvalue ={
//         fieldToUpdate:value
//     }
//     if (!user) {
//         res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide user",title:"workoutActivity"});
//         return;
//     }
//     if (!fieldToUpdate) {
//         res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide id",title:"workoutActivity"});
//         return;
//     }
//     if (!value) {
//         res.render("deleteWorkoutActivity", { flag: 1, message: "Please provide id",title:"workoutActivity"});
//         return;
//     }

//     let updatedActivity = await resultData.updateActivity(activityId,updatedvalue);
//     res.redirect("/workoutActivity");

   
//     console.log(activityId);
//    });
   router.post("/", async (req, res) => {
    let username = req.body.username;
    console.log(username);
    
    let user = await userData.getUserByUsername(username);
    
    console.log(user);
    let userId =user._id;
    console.log(userId);
    let activityId= await resultData.getAllActivitiesById(userId);
    console.log(activityId);
    let activity = req.body.activityId;
   // let weight = req.body.weight;
    //let repetitions = req.body.repetitions;
    let useractivity = await resultData.getActivityById(activity);
    console.log(useractivity);
    let activityContent = await resultData.getAllActivities(useractivity);
    console.log(activityContent);
    // if(!req.body.activityId){
    //   res.status(404).json({ error: "Please provide an activity id" });
    //   return;
    //  }

    //  if(typeof req.body.id != "string"){
    //    res.status(404).json({ error: "Id should be a string" });
    //    return;
    // }

//   const updatedActivity = {
//       activity: activity,
//       weight: weight,
//       repetitions: repetitions
//   }
//   console.log(updatedActivity);
//   try {
//     await recipeData.getRecipeById(req.params.id);
//   } catch (e) {
//     res.status(404).json({ error: "Recipe not found" });
//     return;
//   }

//   if (!updatedActivity) {
//     res.status(400).json({ error: "You must provide data to update a recipe" });
//     return;
//   }

//   if (!updatedActivity.activity) {
//     res.status(400).json({ error: "You must provide an activity" });
//     return;
//   }

//   if(typeof updatedActivity.activity != "string"){
//     res.status(400).json({ error: "activity must be a string" });
//     return;
//   }

//   if (!updatedActivity.weight) {
//     res.status(400).json({ error: "You must provide weight" });
//     return;
//   }
//   if(typeof updatedActivity.weight != "object"){
//     res.status(400).json({ error: "weight must be a object" });
//     return;
//   }

//   if (!updatedActivity.repetitions) {
//     res.status(400).json({ error: "You must provide repetitions" });
//     return;
//   }

//   if(typeof updatedActivity.repetitions != "object"){
//     res.status(400).json({ error: "repetitions must be a object" });
//     return;
//   }
 
//   try {
//    const modifiedActivity= await resultData.updateActivity(activityId,updatedActivity);
//     res.redirect("/workoutActivity");
//   } catch (e) {
//     res.status(404).json({ error: "Activity not found" });
//     return;
//   }
});
   module.exports = router;