const jwt = require("jsonwebtoken");
const Post = require("../models/post");

exports.loginRequired = function(req, res, next) {
	try {
		const token = req.headers.authorization.split("Bearer ")[1];
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (decoded) {
				const user = { ...decoded, token };
				res.locals.user = user;
				return next();
			}
			res.status(401).json({ message: "Please Log In First" });
		});
	} catch (err) {
		res.status(401).json({ message: "Please Log In First" });
	}
};

exports.adminRequired = function(req, res, next) {
	try {
		const token = req.headers.authorization.split("Bearer ")[1];
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (decoded.isAdmin) return next();
			res.status(401).json({ message: "Admin Access Required" });
		});
	} catch (err) {
		res.status(401).json({ message: "Admin Access Required" });
	}
};

exports.ownerRequired = function(req, res, next) {
	try {
		const token = req.headers.authorization.split("Bearer ")[1];
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (decoded.isAdmin) return next();
			Post.findOne({ _id: req.params.id }, function(err, post) {
				if (post.owner.id === decoded.userId) return next();
				res.status(401).json({ message: "Authorization Failed1." });
			});
		});
	} catch (err) {
		res.status(401).json({ message: "Authorization Failed2." });
	}
};
