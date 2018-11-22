const loginRoutes = require("./login");
const dashboard = require("./dashboard");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const constructorMethod = app => {

  app.use(cookieParser());
  
  app.use(bodyParser.json());

  app.use("/", loginRoutes);
  
  app.use("/dashboard",dashboard);
  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
