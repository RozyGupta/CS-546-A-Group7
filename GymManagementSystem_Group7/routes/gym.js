const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.users;



router.get("/", (req, res) => {
  
 
    res.render("login");
  
  });

  router.post("/login", async (req, res) => {
   let username = req.body["username"];
    let password = req.body["password"];
    
    if (!username) {
        res.render("login", { flag: 1, message: "Please provide username",title:"login" });
        return;
    }
    if (!password) {
        res.render("login", { flag: 1, message: "Please provide password",title:"login"});
        return;
    }
    try {
        
        let postcredentials = await resultData.checkCredentials(username, password);
        if (postcredentials.status === true) {
            // let id = postcredentials.user._id;
            //let username = postcredentials.user.username;
            // let FirstName = postcredentials.user.FirstName;
            // let LastName = postcredentials.user.LastName;
            // let Profession = postcredentials.user.Profession;
            // let Bio = postcredentials.user.Bio;
           
            //res.cookie('AuthCookie', { id: id, username: username, FirstName: FirstName, LastName: LastName, Profession: Profession, Bio: Bio });
          
            res.redirect("/dashboard");

        }
        else {
            res.render("login",{ flag: 1, error: "Invalid username/password",title:"login"});
        }
    }
    catch (e) {
        res.render("error",{title:"error"});
    }
});
router.get("/dashboard",(req,res) =>{
res.render("dashboard");
});


  router.get("/create", (req, res) => {
    res.render("create",{title:"createAccount"});
  });

  router.post("/create", async(req,res) =>{
    let FirstName= req.body.firstname;
    let LastName = req.body.lastname;
    let username = req.body.username;
    let password =req.body.password;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let street = req.body.street;
    let apt = req.body.apt;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let zipcode = req.body.zipcode;
    let dob = req.body.dob;
    let gender = req.body.gender;
    await resultData.adduser(FirstName,LastName,username,password,mobile,email,street,apt,city,state,country,zipcode,dob,gender)
    res.redirect("/login");
  });

module.exports = router;