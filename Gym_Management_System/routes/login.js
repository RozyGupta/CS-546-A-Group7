const express = require("express");
const router = express.Router();
const data = require("../data");
const authentication = data.authentication;
const session = data.session;
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const cookieParser = require("cookie-parser");
const xss =require("xss");
router.use(cookieParser());
router.use(bodyParser.json());
const xss =require("xss");

router.get('/', (req, res) => {

  if (!req.cookies.authCookie) {

    res.render("login", {
      layout: 'index',
      title: "Sign In"
    });

  } else {
    res.redirect('/dashboard');
  }
});

router.post('/login', async function (req, res) {

  let userId = undefined;
  let userInfo = req.body;
  let username = xss(userInfo.username);
  let password = xss(userInfo.password);
  try {

    if (!userInfo) {
      throw "You must provide userInfo to login";
    }

    if (!username) {
      throw "You must provide a username";
    }
    if (!password) {

      throw "You must provide a password";
    }
    userId = await authentication.authenticateUser(username, password);

    if (!userId) {
      throw "Username/Password does not match"

    } else {
      let sessionId = uuidv1();
      await session.createSession("authCookie", sessionId, userId);
      res.cookie('authCookie', sessionId);
      res.cookie('userId', userId);
      res.redirect("/dashboard");
    }
  } catch (error) {
    res.status(500).render('login', {
      layout: 'index',
      title: "error",
      error: error
    });
  };
});
router.get('/logout', async function (req, res) {
  let clientSessionId = req.cookies.authCookie;
  await session.deleteSession(clientSessionId);
  res.clearCookie("authCookie");
  res.clearCookie("userId");
  res.render("login", {
    layout: "index",
    title: "login",
    logoutMsg: "You are successfully logged out ! "
  });
});

module.exports = router;
