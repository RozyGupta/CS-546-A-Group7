const createUserRoutes = require("./createUser");
const dashboard = require("./dashboard");
const loginRoutes = require("./login");
const workoutActivityRoutes = require("./workoutActivity");
const viewWorkoutActivityRoutes = require("./viewWorkoutActivity");
const addWorkoutActivityRoutes = require("./addWorkoutActivity");
const deleteWorkoutActivityRoutes = require("./deleteWorkoutActivity");
const updateWorkoutActivityRoutes = require("./updateWorkoutActivity");
const activityRoutes = require("./activity");
const workoutMemberRoutes = require("./workoutMember");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const constructorMethod = app => {

  app.use(cookieParser());

  app.use(bodyParser.json());
try{

  app.use("/", loginRoutes);
  app.use("/dashboard",dashboard);
  app.use("/createUser", createUserRoutes);
  app.use("/workoutActivity",workoutActivityRoutes);
 
  app.use("/addWorkoutActivity", addWorkoutActivityRoutes);
  app.use("/deleteWorkoutActivity", deleteWorkoutActivityRoutes);
  app.use("/updateWorkoutActivity", updateWorkoutActivityRoutes);
  app.use("/viewWorkoutActivity", viewWorkoutActivityRoutes);
  
  app.use("/activity", activityRoutes);
  app.use("/activity/add", activityRoutes);
  app.use("/activity/view/:id", activityRoutes);
  app.use("/activity/update", activityRoutes);
  app.use("/activity/update/:id", activityRoutes);
  app.use("/activity/delete/:id", activityRoutes);

  app.use("/workoutMember", workoutMemberRoutes);
  app.use("/workoutMember/add", workoutMemberRoutes);
  app.use("/workoutMember/view", workoutMemberRoutes);
  app.use("/workoutMember/update", workoutMemberRoutes);
  app.use("/workoutMember/delete", workoutMemberRoutes);
}
catch(error){
  console.log(error);
  app.use("*", (req, res) => {
    res.redirect("/");
  });
}
};

module.exports = constructorMethod;
