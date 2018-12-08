const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;



router.get("/", async (req, res) => {
    try {
        let users = await userData.getAllUsers();
        res.render("viewWorkoutActivity", { username: users });
    }
    catch (e) {
        res.render("error", { title: "error" });
        return;
    }
});

router.post("/", async (req, res) => {

    let userId = req.body.userId;
    console.log("this user id : " + userId)
    if (!userId) {
        res.render("viewWorkoutActivity", { message: "Please provide userId", title: "viewWorkoutActivity" });
        return;
    }

    try {

        let activityIds = await resultData.getAllUserActivitiesId(userId);
        let activityArray = [];
        for (let i = 0; i < activityIds.length; i++) {
            let activity = await resultData.getAllActivities(activityIds[i]);
            activityArray.push(activity);
        }
        let users = await userData.getAllUsers();
        res.render("viewWorkoutActivity", { showactivities: activityArray, username: users });
    }
    catch (e) {
        let user = await userData.getAllUsers();
        res.render("viewWorkoutActivity", { message: "No activities for this user", username: user, title: "viewWorkoutActivity" });
        return;
    }
});
module.exports = router;