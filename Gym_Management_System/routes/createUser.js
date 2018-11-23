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


/*const createUserAuth = async function (req, res, next) {
    let userId = req.cookies.userId;
    console.log (userId);
    try {
        role = await user.getUserById(userId);
        if (!role) {
            throw error;
        } else if (role == "admin") {
            next();
        } else {
            res.status(403).render("error", {
                layout: "index",
                title: "Error",
                error: "Page Not available"
            });
        }
    } catch(err) {
        console.log("Problem in getting role");
    }

};*/


router.get('/',async function (req, res) {
    res.render("createUser");
});
router.post("/",async function (req, res) {
    try{
        let userInfo=req.body;
  
        let successFlag=await user.createUser(userInfo);
        if(successFlag==true){
            res.render("createUser",{
                successMsg:"User Created Successfully"
            })
        }
        else{
            res.render("createUser",{
                alertMsg:"User Creation unsuccess"
            })
        }
    }
    catch(err){
        console.log("ERROR"+err);
    }
});
module.exports = router;