const express = require("express");
const router = express.Router();
const data = require("../data");
const membershipData = data.membership;
const authentication=data.authentication;


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
router.get("/",authRoute("membership"), async (req, res) => {

    try {
        
        let memberships = await membershipData.getAllMemberships();
        res.render("membership", {
            memberships: memberships,
        });
    }catch(error){
        res.render("error", { title: "error" });
    } 
});

router.get("/add",authRoute("addMembership"),async (req, res) => {
    res.render("addMembership");

});

router.post("/add",authRoute("addMembership"),async (req, res) => {

    try {
        let membership = req.body;
        let membershipname = membership.membershipname;
        let membershipperiod = membership.membershipperiod
        let signupfees = membership.signupfees;
        let services = membership.services;

        if (!membershipname) {
            res.render("addMembership", {
                alertMsg: "Please provide membership name",
                title: "addMembership"
            });
            return;
        }
        if (!membershipperiod) {
            res.render("addMembership", {
                alertMsg: "Please provide membership period",
                title: "addMembership"
            });
            return;
        }
        if (!signupfees) {
            res.render("addMembership", {
                alertMsg: "Please provide signup fees",
                title: "addMembership"
            });
            return;
        }
        if (!services) {
            res.render("addMembership", {
                alertMsg: "Please provide services name",
                title: "addMembership"
            });
            return;
        }
        await membershipData.addMembership(membershipname, membershipperiod, signupfees, services);
        res.redirect("/membership");

    } catch (error) {
        res.render("addMembership", {
            alertMsg: "error while adding activity"
        });
    }
});
router.get("/view/:id",authRoute("viewMembership"), async (req, res) => {
    
   
    try {
        let membership = await membershipData.getMembershipById(req.params.id);
        res.render("viewMembership", {
            membership: membership,
        });
    } catch (e) {
        res.status(404).render("membership", {
            errorMessage: "Membership Not Found"
        })
    }
});

router.get("/update/:id",authRoute("updateMembership"),async (req, res) => {
    try {
        let membership = await membershipData.getMembershipById(req.params.id);
        res.render("updateMembership", {
            membership: membership
        });

    } catch (e) {
        res.status(404).render("membership", {
            errorMessage: "Membership Not Found"
        })
    }
});
router.get("/delete/:id",authRoute("deleteMembership"), async (req, res) => {
    try {
        await membershipData.removeMembership(req.params.id);
        res.redirect("/membership");
    } catch (error) {
        res.render("viewMembership", {
            alertMsg: "error while deleting"
        });
    }
});
router.post("/update",authRoute("updateMembership"),async (req, res) => {
    let membership;

    try {
        membership = req.body;

        let membershipId = membership.membershipId;
        let membershipname = membership.membershipname;
        let membershipperiod = membership.membershipperiod;
        let signupfees = membership.signupfees;
        let services = membership.services;
        if (!membershipname) {
            res.render("updateMembership", {
                alertMsg: "Please provide membership name",
                title: "updateMembership"
            });
            return;
        }
        if (!membershipperiod) {
            res.render("updateMembership", {
                alertMsg: "Please provide membership period",
                title: "updateMembership"
            });
            return;
        }
        if (!signupfees) {
            res.render("updateMembership", {
                alertMsg: "Please provide signup fees",
                title: "updateMembership"
            });
            return;
        }
        if (!services) {
            res.render("updateMembership", {
                alertMsg: "Please provide services name",
                title: "updateMembership"
            });
            return;
        } 
        await membershipData.updateMembership(membershipId,membershipname,membershipperiod,signupfees,services);
        const updatedMembership = await membershipData.getMembershipById(membershipId);
        res.render("viewMembership", {
         msg: "Activity updated Successfully",
         membership: updatedMembership
        });
    } catch (error) {
        console.log(error);
        res.render("updateMembership", {
            error: "error while updating",
            membership:membership
        });

    }
});



module.exports = router;