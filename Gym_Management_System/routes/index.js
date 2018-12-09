const createUserRoutes = require("./createUser");
const dashboard = require("./dashboard");
const loginRoutes = require("./login");
const workoutActivityRoutes = require("./workoutActivity");
const activityRoutes = require("./activity");
const workoutMemberRoutes = require("./workoutMember");
const membershipRoutes = require("./membership");
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
  app.use("/workoutActivity/view/",workoutActivityRoutes);
  app.use("/workoutActivity/add/",workoutActivityRoutes);
  app.use("/workoutActivity/delete/",workoutActivityRoutes);
  app.use("/workoutActivity/update/",workoutActivityRoutes);
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
  app.use("/membership", membershipRoutes);
  app.use("/membership/add", membershipRoutes);
  app.use("/membership/view", membershipRoutes);
  app.use("/membership/delete", membershipRoutes);
  app.use("/membership/update", membershipRoutes);
}
catch(error){
  app.use("*", (req, res) => {
    res.redirect("/");
  });
}
};

module.exports = constructorMethod;
