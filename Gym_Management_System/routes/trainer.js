const express = require("express");
const router = express.Router();
const data = require("../data");
const trainerData = data.trainer;
const userData = data.user;
const authentication = data.authentication;
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
            console.log("Problem in getting role" + err);
        }
    };
}

router.get("/", authRoute("trainer"), async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    let userID = req.cookies.userId;    
    let trainer = await trainerData.getAllTrainers();
    try {
        let permission = false;
        let booleanFlag = await authentication.getPermissionForRoute("deleteTrainer", userID)
        if (booleanFlag) {
            permission = true;
        }
        
        
        res.render("trainer", {
            trainer: trainer,
            permission: permission,
            layout:layout
        });
    } catch (error) {
        console.log(error);
    }
});
router.get("/add", authRoute("addTrainer"), async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    let trainernames = await userData.getUserNameByRole("TRAINER");
    res.render("addTrainer", {
        trainernames:trainernames,
        layout:layout,
        title: "addTrainer"
    });

});
router.post("/add", authRoute("addTrainer"), async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    try {
        let trainer = req.body;
        let trainername = xss(trainer.trainername);
        console.log(trainername)
        let certifications = xss(trainer.certifications);
        let biography = xss(trainer.biography);

        if (!trainername) {
            res.render("addTrainer", {
                alertMsg: "Please provide trainer name",
                layout:layout,
                title: "addTrainer"
            });
            return;
        }
        if (!certifications) {
            res.render("addTrainer", {
                alertMsg: "Please provide certifications",
                layout:layout,
                title: "addTrainer"
            });
            return;
        }

        if (!biography) {
            res.render("addTrainer", {
                alertMsg: "Please provide biography",
                layout:layout,
                title: "addTrainer"
            });
            return;
        }
        let trainerAdded=await trainerData.addTrainer(trainername, certifications, biography);
        let trainerId=trainerAdded.newId;
        let user = await userData.getUserByUsername(trainername);
        let userId = user._id;
        await trainerData.addtrainerCert(userId,trainerId);
        res.redirect("/trainer");

    } catch (error) {
        res.render("addTrainer", {
            layout:layout,
            alertMsg: "error while adding trainer"
        });
    }
});
router.get("/view/:id", authRoute("viewTrainer"), async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    let userId =   (req.cookies.userId);
    let permission = false;
    try {
        let booleanFlag = await authentication.getPermissionForRoute("deleteTrainer", userId)
        if (booleanFlag) {
            permission = true;
        }
        let trainer = await trainerData.getTrainerById(  (req.params.id));
        res.render("viewTrainer", {
            trainer: trainer,
            layout:layout ,
            permission:permission
        });
    } catch (e) {
        res.status(404).render("trainer", {
            errorMessage: "Trainer Not Found",
            layout:layout,
            permission:permission
        })
    }
});
router.get("/update/:id", authRoute("updateTrainer"), async (req, res) => {
    
    let layout = await authentication.getLayout(req.cookies.userId);
    let userID = req.cookies.userId;    
    let trainer = await trainerData.getAllTrainers();
    try {
        let permission = false;
        let booleanFlag = await authentication.getPermissionForRoute("deleteTrainer", userID)
        if (booleanFlag) {
            permission = true;
        }
        
        let trainer = await trainerData.getTrainerById(req.params.id);

        res.render("updateTrainer", {
            trainer: trainer,
            layout:layout
        });

    } catch (e) {
        res.status(404).render("trainer", {
            errorMessage: "Trainer Not Found",
            layout:layout,
            permission:permission
        })
    }
});
router.get("/delete/:id", authRoute("deleteTrainer"), async (req, res) => {
    let layout = await authentication.getLayout(req.cookies.userId);
    try {
        await trainerData.removeTrainer(req.params.id);
        res.redirect("/trainer");
    } catch (error) {
        res.render("viewTrainer", {
            alertMsg: "error while deleting",
            layout:layout
        });
    }
});
router.post("/update", authRoute("updateTrainer"), async (req, res) => {
    let trainer;
    let layout = await authentication.getLayout(req.cookies.userId);
    try {
        trainer = req.body;

        let trainerId = xss(trainer.trainerId);
        let trainername = xss(trainer.trainername);
        let certifications = xss(trainer.certifications);
        let biography = xss(trainer.biography);
        if (!trainername) {
            res.render("updateTrainer", {
                alertMsg: "Please provide trainer name",
                title: "updateTrainer",
                layout:layout,
                trainer:trainer
            });
            return;
        }
        if (!certifications) {
            res.render("updateTrainer", {
                alertMsg: "Please provide certifications",
                title: "updateTrainer",
                layout:layout,
                trainer:trainer
            });
            return;
        }

        if (!biography) {
            res.render("updateTrainer", {
                alertMsg: "Please provide biography",
                title: "updateTrainer",
                layout:layout,
                trainer:trainer
            });
            return;
        }
        let updateTrainer = {
            trainerId: trainerId,
            trainername: trainername,
            certifications: certifications,
            layout:layout,
            biography: biography
        };

        await trainerData.updateTrainer(trainerId, updateTrainer);       
        let updatedTrainer = await trainerData.getTrainerById(trainerId);
        res.render("viewTrainer", {
            trainer: updatedTrainer,
            layout:layout,
            msg: "Activity updated Successfully"
        });
    } catch (error) {
        res.render("updateTrainer", {
            trainer: trainer,
            layout:layout,
            error: "error while updating"
        });

    }
});


module.exports = router;