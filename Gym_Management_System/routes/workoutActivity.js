const express = require("express");
const router = express.Router();
const data = require("../data");
const workoutActivityData = data.workoutActivity;
const userData = data.user;
const activityData = data.activity;
const authentication=data.authentication;
const url = require('url');


const authRoute = function (moduleName) {

    return async function (req, res, next) {

        let userId = req.cookies.userId;
        try {
            if (!moduleName) {
                throw "moduleName or UserId is empty";
            } else {
                let booleanFlag = await authentication.getPermissionForRoute(moduleName, userId)
                if (booleanFlag) {
                    next();
                } else {
                    res.status(403).render("error", {
                        layout: "index",
                        title: "Error",
                        error: "Page Not available"
                    });
                }
            }
        } catch (err) {
            res.render("error", { title: "error" })
        };
    }
}


router.get("/",authRoute("addWorkoutActivity"), async (req, res) => {
   
    try {
        let users = await userData.getAllUsers();
        res.render("workoutActivity", {
            username:users,
        });
    }catch(error){
        res.render("error", { title: "error" })
    } 
});

router.get("/view/",authRoute("viewWorkoutActivity"), async (req, res) => {

    try {
        let url_parts = url.parse(req.url, true);
        let query = url_parts.query;
        let userId =req.query.username;
        let activityIds = await workoutActivityData.getAllUserActivitiesId(userId);
        let activityArray = [];
        for (let i = 0; i < activityIds.length; i++) {
            let activity = await workoutActivityData.getAllActivitiesById(activityIds[i]);
            activityArray.push(activity);
        }
        
        res.render("viewWorkoutActivity", { showactivities: activityArray, userId: userId});
    }
    catch (e) {
        let user = await userData.getAllUsers();
        res.render("viewWorkoutActivity", { message: "No activities for this user", username: user, title: "viewWorkoutActivity" });
        return;
    }
});
router.get("/add/",authRoute("addWorkoutActivity"), async (req, res) => {
    try {
        let url_parts = url.parse(req.url, true);
        let query = url_parts.query;
        let userId =req.query.userId; 
        let activity = await activityData.getAllActivities();
        res.render("addWorkoutActivity", {userId:userId,activity:activity});
        
    }
    catch (e) {
        res.render("error", { title: "error" });
        return;
    }

});
router.post("/add/",authRoute("addWorkoutActivity"),async (req, res) => {
    let user =req.body;
    let userId = user.userId
    let level = user.level;
    let description = user.description;
    let startdate = user.startdate;
    let enddate = user.enddate;
    let days = user.days;
    let activity = user.activityname;
    let sets = user.sets;
    let weight = user.weight;
    let repetitions = user.repetitions;

    let allActivities = await activityData.getAllActivities();

        if (!level) {
            res.render("addWorkoutActivity", { activity:allActivities, message: "Please provide level", title: "addWorkoutActivity" });
            return;
        }

        if (!description) {
            res.render("addWorkoutActivity", {activity:allActivities, message: "Please provide description", title: "addworkoutActivity" });
            return;
        }

        if (!startdate) {
            res.render("addWorkoutActivity", {activity:allActivities, message: "Please provide startdate", title: "addWorkoutActivity" });
            return;
        }
        if (!enddate) {
            res.render("addWorkoutActivity", {activity:allActivities,message: "Please provide enddate", title: "addWorkoutActivity" });
            return;
        }
        if (!days) {
            res.render("addWorkoutActivity", {activity:allActivities,message: "Please provide days", title: "addWorkoutActivity" });
            return;
        }
        if (!activity) {
            res.render("addWorkoutActivity", {activity:allActivities,message: "Please provide activity", title: "addWorkoutActivity" });
            return;
        }
        if (!sets) {
            res.render("addWorkoutActivity", {activity:allActivities,message: "Please provide sets", title: "addWorkoutActivity" });
            return;
        }
        if (!weight) {
            res.render("addWorkoutActivity", {activity:allActivities,message: "Please provide weight", title: "addWorkoutActivity" });
            return;
        }
        if (!repetitions) {
            res.render("addWorkoutActivity", {activity:allActivities,message: "Please provide repetitions", title: "addWorkoutActivity" });
            return;
        }
    
    try {
        let postcredentials = await workoutActivityData.addActivity(level, description, startdate, enddate, days, activity, sets, weight, repetitions);
        acitivityId = postcredentials.newId;
        let postuserActivity = await workoutActivityData.addUserActivity(userId, acitivityId);
        res.render("addworkoutActivity", {activity:allActivities,message: "Activity added successfully!" });
    }
    catch (e) {
        res.render("error", { title: "error" });
        return;
    }
});


router.post("/update/",authRoute("updateWorkoutActivity"), async (req, res) => {
   try{
    let activityToUpdate = req.body;
    let activityId = activityToUpdate.activityId;
    let level = activityToUpdate.activitylevel;
    let description = activityToUpdate.activitydescription;
    let startdate = activityToUpdate.activitystartdate;
    let enddate = activityToUpdate.activityenddate;
    let days = activityToUpdate.days;
    let activity = activityToUpdate.activity;
    let sets = activityToUpdate.sets;
    let weight = activityToUpdate.weight;
    let repetitions = activityToUpdate.repetitions;
    if (!level) {
        res.render("updateWorkoutActivity", { activity:allActivities, message: "Please provide level", title: "updateWorkoutActivity" });
        return;
    }

    if (!description) {
        res.render("updateWorkoutActivity", {activity:allActivities, message: "Please provide description", title: "updateWorkoutActivity" });
        return;
    }

    if (!startdate) {
        res.render("updateWorkoutActivity", {activity:allActivities, message: "Please provide startdate", title: "updateWorkoutActivity" });
        return;
    }
    if (!enddate) {
        res.render("updateWorkoutActivity", {activity:allActivities,message: "Please provide enddate", title: "updateWorkoutActivity" });
        return;
    }
    if (!days) {
        res.render("updateWorkoutActivity", {activity:allActivities,message: "Please provide days", title: "updateWorkoutActivity" });
        return;
    }
    if (!activity) {
        res.render("updateWorkoutActivity", {activity:allActivities,message: "Please provide activity", title: "updateWorkoutActivity" });
        return;
    }
    if (!sets) {
        res.render("updateWorkoutActivity", {activity:allActivities,message: "Please provide sets", title: "updateWorkoutActivity" });
        return;
    }
    if (!weight) {
        res.render("updateWorkoutActivity", {activity:allActivities,message: "Please provide weight", title: "updateWorkoutActivity" });
        return;
    }
    if (!repetitions) {
        res.render("updateWorkoutActivity", {activity:allActivities,message: "Please provide repetitions", title: "updateWorkoutActivity" });
        return;
    }
    let updatedActivity = await workoutActivityData.updateActivity(activityId,level,description,startdate,enddate,days,activity,sets,weight,repetitions);
    res.render("viewWorkoutActivity",{message:"Activity updated Successfully",title: "viewWorkoutActivity"})
    }
    catch(e){
        res.render("error", { title: "error" });
    }
 
});

router.get("/delete/",authRoute("deleteWorkoutActivity"), async (req, res) => {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let userId =req.query.userId;
    let activityId= req.query.activityId;
    if (!activityId) {
        res.render("viewWorkoutActivity", { message: "No activity to delete" });
    }
   
    try {
        let postActivity = await workoutActivityData.removeActivity(activityId);
        let postuserActivity = await workoutActivityData.removeUserActivity(activityId);
        res.render("viewWorkoutActivity", { message: "Activity deleted successfully!", userId: userId });
    }
    catch (e) {
        res.render("error", { title: "error" });
    }
});




module.exports = router;