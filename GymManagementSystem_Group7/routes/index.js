const gymRoutes = require("./gym");

const constructorMethod = app => {
  app.use("/", gymRoutes);

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;