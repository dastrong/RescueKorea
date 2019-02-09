const express = require("express");
const cloudinary = require("cloudinary");
const router = express.Router();
const Post = require("../models/post");
const { loginRequired, ownerRequired } = require("../middleware");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// gets all posts in the DB
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (err) {
		res.status(400).json(err);
	}
});

// create a single post
router.post("/", loginRequired, async (req, res) => {
	try {
		const { userId } = res.locals.user;
		const userName = res.locals.user.fullName;
		const userEmail = res.locals.user.email;
		const body = { ...req.body, userEmail, userId, userName };
		const post = await Post.create(body);
		res.status(200).json(post);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// gets all posts in the DB
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id });
		res.status(200).json(post);
	} catch (err) {
		res.status(400).json(err);
	}
});

// update a post
router.put("/:id", ownerRequired, async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, {
			$set: req.body,
		});
		res.status(200).json(post);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// delete a post
router.delete("/:id", ownerRequired, async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		post.images.forEach(image => {
			cloudinary.v2.uploader.destroy(image.public_id, function(err, result) {
				console.log(err);
				console.log(result);
			});
		});
		res.status(200).json(post);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
