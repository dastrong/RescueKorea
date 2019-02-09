const express = require("express");
const router = express.Router();
const posts = require("./posts");
const users = require("./users");
const images = require("./images");

router.use("/posts", posts);
router.use("/users", users);
router.use("/images", images);

module.exports = router;
