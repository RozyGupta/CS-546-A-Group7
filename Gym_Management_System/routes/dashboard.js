const express = require("express");
const router = express.Router();
const data = require("../data");
const user = data.user;
const session = data.session;
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(bodyParser.json());

const userAuth = function (req, res, next) {

    if (!req.cookies.authCookie) {
        res.status(403).render("error", {
            layout: "index",
            title: "Error",
            error: " User is not logged in !"
        });
    } else {
        next();
    }
};

router.get('/', userAuth,async (req, res) => {
   
    try {
        let clientSessionId=req.cookies.authCookie;
        let userId = await session.getSessionById(clientSessionId);
        if (!userId) throw "Unauthorize access";
        userdetail = await user.getUserById(userId);
        res.render("dashboard", {
            title: "Dashboard",
            firstname: userdetail.firstname,
            lastname: userdetail.lastname
        });
    } catch (error) {
        console.log(error);
        res.clearCookie("authCookie");
        res.status(403).render('error', {
            layout: "index",
            title: "Error",
            error: error
        });
    }
});
router.get('/logout', function (req, res) {
    res.clearCookie("authCookie");
    res.render("logout", {
        layout: "index",
        title: "Logout"
    });
});

module.exports = router;
