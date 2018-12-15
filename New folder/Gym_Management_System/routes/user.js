const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.user;
const authentication = data.authentication;
const xss = require("xss");


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
    let userId =   (req.cookies.userId);
    let permission = false;
    try {
        let booleanFlag = await authentication.getPermissionForRoute("user", userId)
        if (booleanFlag) {
            permission = true;
        }
        let users = await userData.getAllUsers();
        res.render("user", {
            users: users,
            layout: layout,
            permission:permission
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
        let userFirstName = xss(userInfo.firstname);
        let userLasttName = xss(userInfo.lastname);
        let userZipCode = xss(userInfo.zipCode);
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
    let userId =   (req.cookies.userId);
    let permission = false;
    try {
        let booleanFlag = await authentication.getPermissionForRoute("viewUser", userId)
        if (booleanFlag) {
            permission = true;
        }
        let user = await userData.getUserById(req.params.id);
        res.render("viewUser", {
            user: user,
            layout: layout,
            permission:permission
        });
    } catch (e) {
        res.status(404).render("user", {
            errorMessage: "User Not Found",
            layout: layout,
            permission:permission
        })
    }
});


router.get("/update/:id", authRoute("updateUser"), async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    let userId =   (req.cookies.userId);
    let permission = false;
    try {
        let booleanFlag = await authentication.getPermissionForRoute("viewUser", userId)
        if (booleanFlag) {
            permission = true;
        }
        let user = await userData.getUserById(req.params.id);
        res.render("updateUser", {
            user: user,
            layout: layout
        });
    } catch (e) {
        res.status(404).render("user", {
            errorMessage: "User Not Found",
            layout: layout,
            permission:permission
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