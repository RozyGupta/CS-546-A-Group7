const user = require("./user");
const session = require("./session");
const authentication = require("./authentication");
const addWorkoutActivity = require("./addWorkoutActivity");

module.exports = {
  user: user,
  session:session,
  authentication:authentication,
  addWorkoutActivity:addWorkoutActivity
};
