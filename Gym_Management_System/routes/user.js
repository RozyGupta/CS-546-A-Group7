const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.user;
const authentication = data.authentication;
const xss = require("xss");

function checkIsProperType(variable, variableType, parameter) { //referred from https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_02/calculator_app_example/calculator.js
    
    if (typeof variable === 'undefined') {
        console.log((typeof variable)+parameter);
        return false;
    } else {

        if (typeof variable != variableType) {
            console.log(parameter+" "+typeof variable);
            return false;
        }
        else return true;
    }
}
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
                console.log(err);
            }
        };
    }

    router.get('/', authRoute("user"), async function (req, res) {
        let layout = await authentication.getLayout(req.cookies.userId);
        try {
            let users = await userData.getAllUsers();
            res.render("user", {
                users: users,
                layout: layout
            });
        } catch (error) {
            res.render("error", {
                title: "error"
            });
        }
    });

    router.get("/add", authRoute("addUser"), async (req, res) => {
        let layout = await authentication.getLayout(req.cookies.userId);
        res.render("addUser", {
            layout: layout,
            title: "User"
        });

    });
    router.post("/add/", authRoute("addUser"), async function (req, res) {
        let layout = await authentication.getLayout(req.cookies.userId);
        try {
            let userInfo = req.body;
            let userEmail = xss(userInfo.email);
            let userFirstName =xss(userInfo.firstname);
            let userLasttName =xss(userInfo.lastname);
            let userZipCode = xss(userInfo.zipCode);
            if (!checkIsProperType(userEmail,"string","email")) {
                res.render("adduser", {
                    alertMsg: "Please provide user Info",
                    title: "adduser",
                    layout: layout
                });
                return;
            }
            
            if (!checkIsProperType(userFirstName,"string","First Name")) {
                res.render("adduser", {
                    alertMsg: "Please provide user Info",
                    title: "adduser",
                    layout: layout
                });
                return;
            }
            if (!checkIsProperType(userLasttName,"string","Last Name")) {
                res.render("adduser", {
                    alertMsg: "Please provide user Info",
                    title: "adduser",
                    layout: layout
                });
                return;
            }
            if (!checkIsProperType(userZipCode,"number","Zipcode")) {
                res.render("adduser", {
                    alertMsg: "Please provide user Info",
                    title: "adduser",
                    layout: layout
                });
                return;
            }
            if (!userInfo) {
                res.render("adduser", {
                    alertMsg: "Please provide user Info",
                    title: "adduser",
                    layout: layout
                });
                return;
            }
            let successFlag = await userData.createUser(userInfo);
            if (successFlag == true) {
                res.redirect("/user");
            } else {
                res.render("addUser", {
                    layout: layout,
                    alertMsg: "User Creation unsuccess"
                })
            }
        } catch (err) {
            console.log("ERROR" + err);
        }
    });

    router.get("/view/:id", authRoute("viewUser"), async (req, res) => {
        let layout = await authentication.getLayout(req.cookies.userId);

        try {
            let user = await userData.getUserById(req.params.id);
            res.render("viewUser", {
                user: user,
                layout: layout
            });
        } catch (e) {
            res.status(404).render("user", {
                errorMessage: "User Not Found",
                layout: layout
            })
        }
    });


    router.get("/update/:id", authRoute("updateUser"), async (req, res) => {
        let layout = await authentication.getLayout(req.cookies.userId);
        try {
            let user = await userData.getUserById(req.params.id);
            res.render("updateUser", {
                user: user,
                layout: layout
            });
        } catch (e) {
            res.status(404).render("user", {
                errorMessage: "User Not Found",
                layout: layout
            })
        }
    });

    router.get("/delete/:id", authRoute("deleteUser"), async (req, res) => {
        let layout = await authentication.getLayout(req.cookies.userId);
        try {
            await userData.deleteUser(req.params.id);
            res.redirect("/user");
        } catch (error) {
            res.render("viewUser", {
                layout: layout,
                alertMsg: "error while deleting"
            });
        }
    });
    router.post("/update", authRoute("updateUser"), async (req, res) => {
        let user;
        let layout = await authentication.getLayout(req.cookies.userId);
        try {
            user = req.body;
            if (!user) {
                res.render("adduser", {
                    alertMsg: "Please provide user Info",
                    title: "adduser",
                    layout: layout
                });
                return;
            }
            let userId = xss(user.userId);
            await userData.updateUser(userId, user);
            let updatedUser = userData.getUserById(userId);
            res.render("viewUser", {
                msg: "User updated Successfully",
                user: updatedUser,
                layout: layout
            });
        } catch (error) {
            console.log(error);
            res.render("updateUser", {
                error: "error while updating",
                layout: layout,
                user: user
            });

        }
    });

    module.exports = router;