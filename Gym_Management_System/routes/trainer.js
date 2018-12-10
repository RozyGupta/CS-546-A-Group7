const express = require("express");
const router = express.Router();
const data = require("../data");
const trainerData = data.trainer;
const userData = data.user;
const authentication = data.authentication;

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

    let userId = req.cookies.userId;

    try {
        let permission = false;
        let booleanFlag = await authentication.getPermissionForRoute("trainer", userId)
        if (booleanFlag) {
            permission = true;
        }
        let trainer = await trainerData.getAllTrainers();
        // let trainerList = await userData.getUserNameByRole("Trainer");
        
        res.render("trainer", {
            trainer: trainer,
            permission: permission
        });
    } catch (error) {
        console.log(error);
    }
});
router.get("/add", authRoute("addTrainer"), async (req, res) => {

    //let trainerList = await userData.getUserNameByRole("TRAINER");
    res.render("addTrainer", {
        //trainerList: trainerList
    });

});
router.post("/add", authRoute("addTrainer"), async (req, res) => {

    try {
        let trainer = req.body;
        let trainername = trainer.trainername;
        let certifications = trainer.certifications
        let biography = trainer.biography;

        if (!trainername) {
            res.render("addTrainer", {
                alertMsg: "Please provide trainer name",
                title: "addTrainer"
            });
            return;
        }
        if (!certifications) {
            res.render("addTrainer", {
                alertMsg: "Please provide certifications",
                title: "addTrainer"
            });
            return;
        }

        if (!biography) {
            res.render("addTrainer", {
                alertMsg: "Please provide biography",
                title: "addTrainer"
            });
            return;
        }
        await trainerData.addTrainer(trainername, certifications, biography);
        res.redirect("/trainer");

    } catch (error) {
        res.render("addTrainer", {
            alertMsg: "error while adding trainer"
        });
    }
});
router.get("/view/:id", authRoute("viewTrainer"), async (req, res) => {

    let userId = req.cookies.userId;
    let permission = false;
    try {
        let booleanFlag = await authentication.getPermissionForRoute("viewTrainer", userId)
        if (booleanFlag) {
            permission = true;
        }
        let trainer = await trainerData.getTrainerById(req.params.id);
        res.render("viewTrainer", {
            trainer: trainer,
            permission: permission
        });
    } catch (e) {
        res.status(404).render("trainer", {
            errorMessage: "Trainer Not Found"
        })
    }
});
router.get("/update/:id", authRoute("updateTrainer"), async (req, res) => {
    try {
        let trainer = await trainerData.getTrainerById(req.params.id);

        res.render("updateTrainer", {
            trainer: trainer
        });

    } catch (e) {
        res.status(404).render("trainer", {
            errorMessage: "Trainer Not Found"
        })
    }
});
router.get("/delete/:id", authRoute("deleteTrainer"), async (req, res) => {
    try {
        await trainerData.removeTrainer(req.params.id);
        res.redirect("/trainer");
    } catch (error) {
        res.render("viewTrainer", {
            alertMsg: "error while deleting"
        });
    }
});
router.post("/update", authRoute("updateTrainer"), async (req, res) => {
    let trainer;

    try {
        trainer = req.body;

        let trainerId = trainer.trainerId;
        let trainername = trainer.trainername;
        let certifications = trainer.certifications;
        let biography = trainer.biography;

        let updateTrainer = {
            trainerId: trainerId,
            trainername: trainername,
            certifications: certifications,
            biography: biography
        };

        await trainerData.updateTrainer(trainerId, updateTrainer);       
        let updatedTrainer = await trainerData.getTrainerById(trainerId);
        res.render("viewTrainer", {
            trainer: updatedTrainer,
            msg: "Activity updated Successfully"
        });
    } catch (error) {

        //let trainerList = await userData.getUserNameByRole("TRAINER");
        res.render("updateTrainer", {
            trainer: trainer,
            error: "error while updating"
        });

    }
});


module.exports = router;