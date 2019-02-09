const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const {
	adminRequired,
	loginRequired,
	ownerRequired,
} = require("../middleware");

// gets all users
router.get("/", adminRequired, async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json(err);
	}
});

// user login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		user.comparePassword(req.body.password, function(err, isMatch) {
			if (!isMatch) {
				res.status(400).json({ message: "Invalid Email/Password" });
			} else {
				const token = jwt.sign(
					{
						userId: user.id,
						fullName: user.fullName,
						email: user.email,
						isAdmin: user.isAdmin,
					},
					process.env.JWT_SECRET,
					{ expiresIn: "7d" }
				);
				res.status(200).json({
					token,
					fullName: user.fullName,
					email: user.email,
					userId: user.id,
					isAdmin: user.isAdmin,
				});
			}
		});
	} catch (err) {
		res.status(400).json({ message: "Invalid Email/Password" });
	}
});

// user signup
router.post("/signup", async (req, res) => {
	try {
		const user = await User.create(req.body);
		const token = jwt.sign(
			{
				userId: user.id,
				fullName: user.fullName,
				email: user.email,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "7d" }
		);
		res.status(201).json({
			token,
			fullName: user.fullName,
			email: user.email,
			userId: user.id,
			isAdmin: user.isAdmin,
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

// verify is user is authenticated
router.get("/verify", loginRequired, async (req, res) => {
	res.status(200).json(res.locals.user);
});

// delete a user
router.delete("/:id", ownerRequired, async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json(err);
	}
});

// social verification
router.post("/social", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) res.status(400).json({ message: "Please Register First" });
		const token = jwt.sign(
			{
				userId: user.id,
				fullName: user.fullName,
				email: user.email,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "7d" }
		);
		res.status(200).json({
			token,
			fullName: user.fullName,
			email: user.email,
			userId: user.id,
			isAdmin: user.isAdmin,
		});
	} catch (err) {
		res.status(400).json({ message: "Please Register First" });
	}
});

module.exports = router;
