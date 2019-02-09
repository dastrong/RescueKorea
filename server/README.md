## API for Rescue Korea

The site was made during my first [Chingu](https://chingu.io/) experience.
Live site: [here](https://rescuekorea.netlify.com)
Client code: [here](https://github.com/chingu-voyages/geckos-project-16) and/or [here](https://github.com/dastrong/RescueKorea/tree/master/client)

### Built the following:

- Express
- Mongo
- Mongoose
- Serverless HTTP
- JWT
- bcrypt

### Where's it hosted?

It's actually serverless using AWS Lambda and their API Gateway. It's my first attempt at going serverless, so I used [this](https://dev.to/adnanrahic/a-crash-course-on-serverless-apis-with-express-and-mongodb-193k) article as a guide to get started. It found it very helpful.

### What to try it locally?

You'll need a `secrets.json` file in your root directory and fill in the following with your own variables

```
"NODE_ENV": "envhere",
"DB": "mongoDbUrlHere",
"JWT_SECRET": "superSecretCodeHere",
"CLOUD_NAME": "cloudinaryNameHere",
"CLOUD_API_KEY": "cloudinaryApiKeyHere",
"CLOUD_API_SECRET": "cloudinaryApiSecretHere"
```
