const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// used a user edits their posts
router.delete("/single", async (req, res) => {
	try {
		cloudinary.v2.uploader.destroy(req.query.public_ids, function(err, result) {
			if (err) throw err;
			res.status(200).json({ message: "Successfully Deleted" });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get("/old", async (req, res) => {
	try {
		const numOfDays = 91;
		const currentDay = new Date();
		const cutOffDay = new Date(
			currentDay.getTime() - numOfDays * 24 * 60 * 60 * 1000
		);
		cloudinary.v2.api.resources(
			{ type: "upload", prefix: "petChingus" },
			function(err, result) {
				if (err) throw err;
				const toBeDeleted = result.resources.filter(
					img => cutOffDay > new Date(img.created_at)
				);
				const ids = toBeDeleted.map(x => x.public_id);
				if (!ids.length) return res.status(200).send("No Images to Delete");
				cloudinary.v2.api.delete_resources(ids, function(err, result) {
					if (err) throw err;
					res.status(200).send("Successfully Deleted Old Images");
				});
			}
		);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

module.exports = router;
