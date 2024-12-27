const express = require("express");
const router = express.Router();

/* Controller */
const {
  Registration,
  Login,
  GetUser
} = require("../Controller/UserController.js");

/* test routes */
router.get("/", async (req, res) => {
  res.send("user routes tested");
});

router.post("/sign-up", Registration);
router.post("/sign-in", Login);
router.post("/user-details", GetUser);



module.exports = router;
