const createUserRoutes = require("./createUser");
const dashboard = require("./dashboard");
const loginRoutes = require("./login");
const workoutActivityRoutes = require("./workoutActivity");
const addWorkoutActivityRoutes = require("./addWorkoutActivity");
const deleteWorkoutActivityRoutes = require("./deleteWorkoutActivity");
const updateWorkoutActivityRoutes = require("./updateWorkoutActivity");
const viewWorkoutActivityRoutes = require("./viewWorkoutActivity");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const constructorMethod = app => {

  app.use(cookieParser());
  
  app.use(bodyParser.json());

  app.use("/", loginRoutes);
  app.use("/dashboard",dashboard);
  app.use("/createUser", createUserRoutes);
  app.use("/workoutActivity", workoutActivityRoutes);
  app.use("/addWorkoutActivity", addWorkoutActivityRoutes);
  app.use("/deleteWorkoutActivity", deleteWorkoutActivityRoutes);
  app.use("/updateWorkoutActivity", updateWorkoutActivityRoutes);
  app.use("/viewWorkoutActivity", viewWorkoutActivityRoutes);
  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
