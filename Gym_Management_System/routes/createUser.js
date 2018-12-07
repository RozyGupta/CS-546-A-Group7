const express = require("express");
const router = express.Router();
const data = require("../data");
const user = data.user;
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(bodyParser.json());

const authRoute = function (moduleName) {

    return async function (req, res, next) {

        let userId = req.cookies.userId;
        console.log("userId" + userId);
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
            console.log("Problem in getting role" + err);
        }
    };
}

router.get('/', authRoute("createUser"), function (req, res) {
    res.render("createUser");
});
router.post("/", authRoute("createUser"), async function (req, res) {
    try {
        let userInfo = req.body;
        let successFlag = await user.createUser(userInfo);
        if (successFlag == true) {
            res.render("createUser", {
                successMsg: "User Created Successfully"
            })
        } else {
            res.render("createUser", {
                alertMsg: "User Creation unsuccess"
            })
        }
    } catch (err) {
        console.log("ERROR" + err);
    }
});
module.exports = router;