const express = require("express");
const router = express.Router();
const data = require("../data");
const gymMemberData = data.gymMember;
const authentication=data.authentication;
const noticeData=data.notice;

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
            res.render("error", { title: "error" });
        }
    };
}
router.get("/",authRoute("gymMember"), async (req, res) => {

    try {
        
        let gymMember = await gymMemberData.getAllGymMembers();
        res.render("gymMember", {
            gymMember: gymMember,
        });
    }catch(error){
        res.render("error", { title: "error" });
    } 
});


router.get("/add",authRoute("addGymMember"),async (req, res) => {
    res.render("addGymMember");

});

router.post("/add",authRoute("addGymMember"),async (req, res) => {

    try {
        let member = req.body;
        let membername = member.membername;
        let memberaddress = member.memberaddress
        let memberemail = member.memberemail;
        let membermobileno = member.membermobileno;
        let memberdob = member.memberdob;
        let membergender = member.membergender;
        let memberusername = member.memberusername;
        let memberheight = member.memberheight;
        let memberweight = member.memberweight;
        if (!membername) {
            res.render("addGymMember", {
                alertMsg: "Please provide name",
                title: "addGymMember"
            });
            return;
        }
        if (!memberaddress) {
            res.render("addGymMember", {
                alertMsg: "Please provide address",
                title: "addGymMember"
            });
            return;
        }
        if (!memberemail) {
            res.render("addGymMember", {
                alertMsg: "Please provide email",
                title: "addGymMember"
            });
            return;
        }
        if (!membermobileno) {
            res.render("addGymMember", {
                alertMsg: "Please provide mobileno",
                title: "addGymMember"
            });
            return;
        }
        if (!memberdob) {
            res.render("addGymMember", {
                alertMsg: "Please provide date of birth",
                title: "addGymMember"
            });
            return;
        }
        if (!membergender) {
            res.render("addGymMember", {
                alertMsg: "Please provide gender",
                title: "addGymMember"
            });
            return;
        }
        if (!memberusername) {
            res.render("addGymMember", {
                alertMsg: "Please provide username",
                title: "addGymMember"
            });
            return;
        }
        if (!memberheight) {
            res.render("addGymMember", {
                alertMsg: "Please provide height",
                title: "addGymMember"
            });
            return;
        }
        if (!memberweight) {
            res.render("addGymMember", {
                alertMsg: "Please provide weight",
                title: "addGymMember"
            });
            return;
        }
        let bmi = memberweight/(memberheight*memberheight);
        await gymMemberData.addGymMember(membername, memberaddress, memberemail, membermobileno,memberdob,membergender,memberusername,memberheight,memberweight,bmi);
        res.redirect("/gymMember");

    } catch (error) {
        res.render("addGymMember", {
            alertMsg: "error while adding member"
        });
    }
});
router.get("/view/:id",authRoute("viewGymMember"), async (req, res) => {
    
   
    try {
        let member = await gymMemberData.getGymMemberById(req.params.id);
        res.render("viewGymMember", {
            member: member,
        });
    } catch (e) {
        res.status(404).render("gymMember", {
            errorMessage: "Member Not Found"
        })
    }
});
router.get("/update/:id",authRoute("updateGymMember"),async (req, res) => {
    try {
        let member = await gymMemberData.getGymMemberById(req.params.id);
        res.render("updateGymMember", {
            member: member
        });

    } catch (e) {
        res.status(404).render("gymMember", {
            errorMessage: "Member Not Found"
        })
    }
});
router.get("/delete/:id",authRoute("deleteGymMember"), async (req, res) => {
    try {
        await gymMemberData.removeGymMember(req.params.id);
        res.redirect("/gymMember");
    } catch (error) {
        res.render("viewGymMember", {
            alertMsg: "error while deleting"
        });
    }
});

router.post("/update",authRoute("updateGymMember"),async (req, res) => {
    let member;

    try {
        member = req.body;
        let memberId = member.memberId;
        let membername = member.membername;
        let memberaddress = member.memberaddress
        let memberemail = member.memberemail;
        let membermobileno = member.membermobileno;
        let memberdob = member.memberdob;
        let membergender = member.membergender;
        let memberusername = member.memberusername;
        let memberheight = member.memberheight;
        let memberweight = member.memberweight;
        let bmi = memberweight/(memberheight*memberheight);
        await gymMemberData.updateGymMember(memberId,membername,memberaddress,memberemail,membermobileno,memberdob,membergender,memberusername,memberheight,memberweight,bmi);
         res.render("viewGymMember", {
         msg: "Activity updated Successfully"
        });
    } catch (error) {
        console.log(error)
        res.render("updateGymMember", {
            error: "error while updating"
        });

    }
});




module.exports = router;