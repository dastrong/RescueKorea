const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	fullName: {
		type: String,
		required: [true, "Full Name Required"],
	},
	email: {
		type: String,
		required: [true, "Email Required"],
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, "Password Required"],
		minlength: [8, "Password must be at least 8 characters"],
	},
	isAdmin: { type: Boolean, default: false },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.plugin(uniqueValidator, { message: "Email already taken." });

UserSchema.pre("save", function(next) {
	if (!this.isModified("password")) return next();
	bcrypt.hash(this.password, 10).then(hashedPassword => {
		this.password = hashedPassword;
		next();
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, next) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return next(err);
		next(null, isMatch);
	});
};

module.exports = mongoose.model("User", UserSchema);
