const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;





   router.post("/", async (req, res) => {
       let activityId=req.body.activityId;
       

       console.log("activityId"+activityId);
       

       let postActivity = await resultData.removeActivity(activityId);
  
        res.render("viewWorkoutActivity",{message:"Activity deleted successfully!"});
        
   });


module.exports = router;