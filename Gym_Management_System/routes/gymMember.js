const express = require("express");
const router = express.Router();
const data = require("../data");
const gymMemberData = data.gymMember;
const authentication=data.authentication;
const noticeData=data.notice;
const userData = data.user;
const xss =require("xss");

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
    let layout = await authentication.getLayout(req.cookies.userId);

    try {
        
        let gymMember = await gymMemberData.getAllGymMembers();
        res.render("gymMember", {
            gymMember: gymMember,
            layout:layout
        });
    }catch(error){
        res.render("error", { title: "error" });
    } 
});


router.get("/add",authRoute("addGymMember"),async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    let membernames = await userData.getUserNameByRole("gymMember");
    res.render("addGymMember",{
        membernames: membernames,
        layout:layout
    });

});

router.post("/add",authRoute("addGymMember"),async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    try {
        let member = req.body;
        let membername = xss(member.membername);
        let memberheight = xss(member.memberheight);
        let memberweight = xss(member.memberweight);
        if (!membername) {
            res.render("addGymMember", {
                alertMsg: "Please provide name",
                title: "addGymMember",
                layout:layout
               
            });
            return;
        }
        if (!memberheight) {
            res.render("addGymMember", {
                alertMsg: "Please provide height",
                layout:layout,
                title: "addGymMember"
            });
            return;
        }
        if (!memberweight) {
            res.render("addGymMember", {
                alertMsg: "Please provide weight",
                layout:layout,
                title: "addGymMember"
            });
            return;
        }
        let bmi = memberweight/(memberheight*memberheight);
        let memberAdded =await gymMemberData.addGymMember(membername,memberheight,memberweight,bmi);
        let memberId=memberAdded.newId;
        let user = await userData.getUserByUsername(membername);
        let userId = user._id;
        await gymMemberData.addmemberstats(userId,memberId);
        res.redirect("/gymMember");

    } catch (error) {
        res.render("addGymMember", {
            alertMsg: "error while adding member",
            layout:layout
        });
    }
});
router.get("/view/:id",authRoute("viewGymMember"), async (req, res) => {
    
    let layout = await authentication.getLayout(req.cookies.userId);
    try {
        let member = await gymMemberData.getGymMemberById(req.params.id);
        res.render("viewGymMember", {
            member: member,
            layout:layout
        });
    } catch (e) {
        res.status(404).render("gymMember", {
            errorMessage: "Member Not Found"
        })
    }
});
router.get("/update/:id",authRoute("updateGymMember"),async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    try {
        let member = await gymMemberData.getGymMemberById(req.params.id);
        res.render("updateGymMember", {
            member: member,
            layout:layout
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
    let layout = await authentication.getLayout(req.cookies.userId);
    try {
        member = req.body;
        let memberId = xss(member.memberId);
        let membername = xss(member.membername);
        let memberheight = xss(member.memberheight);
        let memberweight = xss(member.memberweight);
        if (!membername) {
            res.render("updateGymMember", {
                alertMsg: "Please provide name",
                title: "updateGymMember",
                layout:layout,
                member:member
            });
            return;
        }
        if (!memberheight) {
            res.render("updateGymMember", {
                alertMsg: "Please provide height",
                title: "updateGymMember",
                layout:layout,
                member:member
            });
            return;
        }
        if (!memberweight) {
            res.render("updateGymMember", {
                alertMsg: "Please provide weight",
                title: "updateGymMember",
                layout:layout,
                member:member
            });
            return;
        }
        let bmi = memberweight/(memberheight*memberheight);
        await gymMemberData.updateGymMember(memberId,membername,memberheight,memberweight,bmi);
        let updatedGymMember = await gymMemberData.getGymMemberById(memberId);
        res.render("viewGymMember", {
         msg: "Activity updated Successfully",
         layout:layout,
         member:updatedGymMember
        });
    } catch (error) {
        res.render("updateGymMember", {
            error: "error while updating",
            layout:layout,
            member:member
        });

    }
});




module.exports = router;