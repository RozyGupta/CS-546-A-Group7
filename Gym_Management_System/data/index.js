const user = require("./user");
const session = require("./session");
const authentication = require("./authentication");
const workoutActivity = require("./workoutActivity");
const activity = require("./activity");
const workoutMember = require("./workoutMember");
const membership = require("./membership");
const trainer = require("./trainer");

module.exports = {
  user: user,
  trainer: trainer,
  session: session,
  authentication: authentication,
  workoutActivity: workoutActivity,
  activity: activity,
  workoutMember: workoutMember,
  membership: membership
};
