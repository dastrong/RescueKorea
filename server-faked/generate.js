module.exports = function() {
	const faker = require("faker");
	const _ = require("lodash");

	// adjust these as needed
	const numOfUsers = 5;
	const numOfPosts = 50;
	const numOfImgs = 3;

	// returns an array of users
	const users = _.times(numOfUsers, index => ({
		id: index,
		name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		email: faker.internet.email(),
		password: faker.internet.password(),
		admin: faker.random.boolean(),
		createdAt: Date.now(),
	}));

	// returns an array of posts
	const posts = _.times(numOfPosts, index => ({
		_id: String(index),
		// assigns a random user to each post
		owner: users[Math.floor(Math.random() * numOfUsers)],
		type: faker.random.arrayElement(["Dog", "Cat", "Other"]),
		description: faker.lorem.paragraphs(),
		images: _.times(numOfImgs, () => ({
			url: faker.image.animals(),
			path: faker.random.uuid(),
			thumb: faker.image.animals(),
			token: faker.random.uuid(),
		})),
		petName: faker.name.firstName(),
		breed: faker.random.arrayElement([
			"Husky",
			"Bulldog",
			"Labrador",
			"Boxer",
			"Spaniel",
			"Korean Shorthair",
		]),
		location: faker.random.arrayElement([
			"Seoul",
			"Busan",
			"Gwangju",
			"Jeju",
			"Suwon",
			"Daegu",
		]),
		age: `${Math.floor(Math.random() * 12)} ${faker.random.arrayElement([
			"month(s)",
			"year(s)",
		])}`,
		gender: faker.random.boolean() ? "Male" : "Female",
		size: faker.random.arrayElement(["Small", "Medium", "Large"]),
		color: faker.random.arrayElement([
			"Black",
			"White",
			"Tabby",
			"Ginger",
			"Yellow",
			"Grey",
		]),
		spayed: faker.random.boolean(),
		vaccinated: faker.random.boolean(),
		goodWith: ["Dogs", "Cats"],
		trained: ["House", "Crate"],
		adoptionFee: Math.floor(Math.random() * 100000),
	}));

	// send an object with our users and posts
	return { users, posts };
};
