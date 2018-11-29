const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.activity;


router.get("/", async (req, res) => {
       
        res.render("addActivity"); 

});

router.post("/", async (req, res) => {

        let activity = req.body;
        let activityname = activity.activity;
        let activitytrainer = activity.activitytrainer
        let membershipplan = activity.membershipplan;
        let member = activity.activitymember;
        if (!activityname) {
                res.render("addActivity", { activityname: activity, message: "Please provide activity name", title: "addActivity" });
                return;
        }
        if (!activitytrainer) {
                res.render("addActivity", { aactivitytrainer: activity, message: "Please provide activity trainer name", title: "addActivity" });
                return;
        }
        if (!membershipplan) {
                res.render("addActivity", { membershipplan: activity, message: "Please provide membershipplan", title: "addActivity" });
                return;
        }
        if (!member) {
                res.render("addActivity", { member: activity, message: "Please provide member name", title: "addActivity" });
                return;
        }

 
       
        let postcredentials = await resultData.addActivity(activityname,activitytrainer,membershipplan,member);
        let acitivityId = postcredentials.newId;
        console.log("aid " +acitivityId)
        res.render("addActivity", {message: "Activity added successfully!" });
   
});

module.exports = router;