const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;

router.post("/", async (req, res) => {
    let activityId = req.body.activityId;
    if (!activityId) {
        res.render("viewWorkoutActivity", { message: "No activity to delete" });
    }

    try {
        let postActivity = await resultData.removeActivity(activityId);
        let postuserActivity = await resultData.removeUserActivity(activityId);
        let users = await userData.getAllUsers();
        res.render("viewWorkoutActivity", { message: "Activity deleted successfully!", username: users });
    }
    catch (e) {
        res.render("error", { title: "error" });
    }
});




module.exports = router;