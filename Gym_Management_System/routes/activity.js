const express = require("express");
const router = express.Router();
const data = require("../data");
const activityData = data.activity;
const userData = data.user;
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
            res.render("error", { title: "error" });
        }
    };
}

router.get("/",authRoute("activity"), async (req, res) => {

    try {
        let activity = await activityData.getAllActivities();
        res.render("activity", {
            activity: activity
        });
    }catch(error){
        res.render("error", { title: "error" });
    } 
});
router.get("/add", authRoute("addActivity"),async (req, res) => {

    let trainerList = await userData.getUserNameByRole("TRAINER");
    res.render("addActivity", {
        trainerList: trainerList
    });

});
router.post("/add",authRoute("addActivity"),async (req, res) => {

    try {
        let activity = req.body;
        let activityname = activity.activityname;
        let activitytrainer = activity.activitytrainer
        let membershipplan = activity.membershipplan;
        let activityDescription = activity.activityDescription;

        if (!activityname) {
            res.render("addActivity", {
                alertMsg: "Please provide activity name",
                title: "addActivity"
            });
            return;
        }
        if (!activitytrainer) {
            res.render("addActivity", {
                alertMsg: "Please provide activity trainer name",
                title: "addActivity"
            });
            return;
        }
        if (!membershipplan) {
            res.render("addActivity", {
                alertMsg: "Please provide membershipplan",
                title: "addActivity"
            });
            return;
        }
        if (!activityDescription) {
            res.render("addActivity", {
                alertMsg: "Please provide member name",
                title: "addActivity"
            });
            return;
        }
        await activityData.addActivity(activityname, activitytrainer, membershipplan, activityDescription);
        res.redirect("/activity");

    } catch (error) {
        res.render("addActivity", {
            alertMsg: "error while adding activity"
        });
    }
});
router.get("/view/:id",authRoute("viewActivity"), async (req, res) => {
    
    let userId = req.cookies.userId;
    let permission=false;
    try {
        let booleanFlag = await authentication.getPermissionForRoute("viewActivity", userId)
        if(booleanFlag) {
            permission=true;
        }
        let activity = await activityData.getActivityById(req.params.id);
        res.render("viewActivity", {
            activity: activity,
            permission:true
        });
    } catch (e) {

        res.status(404).render("activity", {
            errorMessage: "Activity Not Found"
        })
    }
});
router.get("/update/:id",authRoute("updateActivity"),async (req, res) => {
    try {
        let activity = await activityData.getActivityById(req.params.id);
        let trainerList = await userData.getUserNameByRole("TRAINER");
        res.render("updateActivity", {
            activity: activity,
            trainerList: trainerList
        });

    } catch (e) {
        res.status(404).render("activity", {
            errorMessage: "Activity Not Found"
        })
    }
});
router.get("/delete/:id",authRoute("deleteActivity"), async (req, res) => {
    try {
        await activityData.removeActivity(req.params.id);
        res.redirect("/activity");
    } catch (error) {
        res.render("viewActivity", {
            alertMsg: "error while deleting"
        });
    }
});
router.post("/update",authRoute("updateActivity"), async (req, res) => {
    let activity;

    try {
        activity = req.body;

        let activityId = activity.activityId;
        let activityname = activity.activityname;
        let activityDescription = activity.description;
        let activitytrainer = activity.trainer;
        let membershipplan = activity.membershipplan;

        let updateActivity = {
            activityId: activityId,
            activityname: activityname,
            activityDescription: activityDescription,
            membershipplan: membershipplan,
            activitytrainer: activitytrainer
        };

        await activityData.updateActivity(activityId, updateActivity);
        let updatedActivity = await activityData.getActivityById(activityId);
        res.render("viewActivity", {
            activity: updatedActivity,
            msg: "Activity updated Successfully"
        });
    } catch (error) {

        let trainerList = await userData.getUserNameByRole("TRAINER");
        res.render("updateActivity", {
            activity: activity,
            trainerList: trainerList,
            error: "error while updating"
        });

    }
});


module.exports = router;