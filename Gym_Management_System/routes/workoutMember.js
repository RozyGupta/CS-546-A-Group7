const express = require("express");
const router = express.Router();
const data = require("../data");
const activityData = data.activity;
const userData = data.user;
const resultData = data.workoutMember;
const authentication=data.authentication;

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
            console.log("Problem in getting role" + err);
        }
    };
}

router.get("/", async (req, res) => {

    let userId = req.cookies.userId;
    let permission=false;
    try {
        let booleanFlag = await authentication.getPermissionForRoute("workoutMember", userId)
        if(booleanFlag) {
            permission=true;
        }
       
        res.render("workoutMember", {
            permission:true
        });
    }catch(error){
        console.log(error);
    } 
});
router.get("/add", authRoute("addWorkoutMember"),async (req, res) => {

    try {
        let userId = req.cookies.userId; 
        let permission=false;
        let user = await userData.getUserById(userId);
        let booleanFlag = await authentication.getPermissionForRoute("workoutMember", userId)
        if(booleanFlag) {
            permission=true;
        }
    
        let activity = await activityData.getAllActivities();
        res.render("memberAddWorkout", { user: user, activity:activity, permission:permission});
    }
    catch (e) {
        res.render("error", { title: "error" });
        return;
    }
});

router.post("/add",authRoute("addWorkoutMember"),async (req, res) => {

    let user = req.body;
    let username = user.username;
    let level = user.level;
    let description = user.description;
    let startdate = user.startdate;
    let enddate = user.enddate;
    let days = user.days;
    let activity = user.activity;
    let sets = user.sets;
    let weight = user.weight;
    let repetitions = user.repetitions;
       
        
        if (!level) {
            res.render("memberAddWorkout", { username: user, message: "Please provide level", title: "addWorkoutActivity" });
            return;
        }

        if (!description) {
            res.render("memberAddWorkout", { username: user, message: "Please provide description", title: "addworkoutActivity" });
            return;
        }

        if (!startdate) {
            res.render("memberAddWorkout", { username: user, message: "Please provide startdate", title: "addWorkoutActivity" });
            return;
        }
        if (!enddate) {
            res.render("memberAddWorkout", { username: user, message: "Please provide enddate", title: "addWorkoutActivity" });
            return;
        }
        if (!days) {
            res.render("memberAddWorkout", { username: user, message: "Please provide days", title: "addWorkoutActivity" });
            return;
        }
        if (!activity) {
            res.render("memberAddWorkout", { username: user, message: "Please provide activity", title: "addWorkoutActivity" });
            return;
        }
        if (!sets) {
            res.render("memberAddWorkout", { username: user, message: "Please provide sets", title: "addWorkoutActivity" });
            return;
        }
        if (!weight) {
            res.render("memberAddWorkout", { username: user, message: "Please provide weight", title: "addWorkoutActivity" });
            return;
        }
        if (!repetitions) {
            res.render("memberAddWorkout", { username: user, message: "Please provide repetitions", title: "addWorkoutActivity" });
            return;
        }

    let acitivityId = null;
    try {
        let permission=false;
        
        let postcredentials = await resultData.addActivity(level, description, startdate, enddate, days, activity, sets, weight, repetitions);
        acitivityId = postcredentials.newId;
        let userId = req.cookies.userId;    
        let user = userData.getUserById(userId);
        let postuserActivity = await resultData.addUserActivity(userId, acitivityId);
        let booleanFlag = await authentication.getPermissionForRoute("addWorkoutMember", userId)
        if(booleanFlag) {
            permission=true;
        }
        res.render("memberAddWorkout", {username: user,message: "Activity added successfully!" });
    }
    catch (e) {
        res.render("error", { title: "error" });
        return;
    }
});
router.get("/view", async (req, res) => {
    
    try {
        let userId = req.cookies.userId;  
        let user = await userData.getUserById(userId);
        let permission=false;
        let booleanFlag = await authentication.getPermissionForRoute("viewWorkoutMember", userId)
        if(booleanFlag) {
            permission=true;
        }
        console.log(userId)
        let activityIds = await resultData.getAllUserActivitiesId(userId);
        console.log(activityIds)
        let activityArray = [];
        for (let i = 0; i < activityIds.length; i++) {
            console.log("33333")
            let activity = await resultData.getAllActivities(activityIds[i]);
            activityArray.push(activity);
        }
        console.log(activityArray)
        res.render("memberViewWorkout", { showactivities: activityArray, username: user, permission:permission });
       
    }
    catch (e) {
        res.render("error", { title: "error" });
        return;
    }
});

router.post("/view",authRoute("viewWorkoutMember"), async (req, res) => {
    let userId = req.cookies.userId;   
    let user = await userData.getUserById(userId);
    if (!userId) {
        res.render("memberViewWorkout", { message: "Please provide userId", title: "memberViewWorkout" });
        return;
    }

    try {

        let activityIds = await resultData.getAllUserActivitiesId(userId);
        let activityArray = [];
        for (let i = 0; i < activityIds.length; i++) {
            let activity = await resultData.getAllActivities(activityIds[i]);
            activityArray.push(activity);
        }
        
        res.render("memberViewWorkout", { showactivities: activityArray, username: user });
    }
    catch (e) {
        let userId = req.cookies.userId;   
        let user = await userData.getUserById(userId);
        res.render("memberViewWorkout", { message: "No activities for this user", username: user, title: "viewWorkoutActivity" });
        return;
    }
});


router.post("/delete",authRoute("deleteWorkoutMember"), async (req, res) => {
    let activityId = req.body.activityId;

    if (!activityId) {
        res.render("memberViewWorkout", { message: "No activity to delete" });
    }

    try {
        let postActivity = await resultData.removeActivity(activityId);
        let postuserActivity = await resultData.removeUserActivity(activityId);
        let userId = req.cookies.userId;   
        let user = await userData.getUserById(userId);
        res.render("memberViewWorkout", { message: "Activity deleted successfully!", username: user });
    }
    catch (e) {
        res.render("error", { title: "error" });
    }
});
router.post("/update",authRoute("updateWorkoutMember"), async (req, res) => {
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
    let updatedActivity = await resultData.updateActivity(activityId,level,description,startdate,enddate,days,activity,sets,weight,repetitions);
    let userId = req.cookies.userId;   
    let user = await userData.getUserById(userId);
    
    res.render("memberViewWorkout",{message:"Activity updated Successfully",title: "memberViewWorkout",username:user})
 
});


module.exports = router;