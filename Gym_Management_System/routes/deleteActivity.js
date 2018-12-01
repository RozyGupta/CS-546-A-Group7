const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.activity;


router.post("/", async (req, res) => {
  let activityId=req.body.activityid;
  

  console.log("activityId"+activityId);
  

  let postActivity = await resultData.removeActivity(activityId);

   res.render("viewActivity",{message:"Activity deleted successfully!"});
});


module.exports = router;