# Chingu Voyage Project (Geckos 16)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Waffle.io - Issues in progress](https://badge.waffle.io/chingu-voyages/geckos-project-16.png?label=in%20progress&title=In%20Progress)](http://waffle.io/chingu-voyages/geckos-project-16)

## Our Team

- [Daniel Strong](https://github.com/dastrong) _Team Lead_
- [Jim Wright](https://github.com/diskomotech)
- [Harjas](https://github.com/harjas27)
- [Dhairya](https://github.com/dhairyadwivedi)

## Our Project Idea

To create a site that will make it easier for people to connect with dogs for adoption in South Korea. There are sites that do this already, but are most were outdated or not visually appealing.

## MVP

We'll use sample post data as our 'backend' and complete the entire front end. If all goes smoothly, we'll look to add a real backend, where users can create an account to add, update and remove real posts.

# Project Review

We ended up completing our MVP on time, so I made a serverless API. You can view that [here](https://github.com/dastrong/chingu16-server) and our fake data server [here](https://github.com/dastrong/geckos16-faked-data). Each has further information in their respective readme's.

### Things to note:

- Our backend is built on a free Lambda tier and a non-production tier of mongoDB, so I wanted to reduce the number of calls to each.
- To reduce site maintenance, we used mongoDB TTL to automatically delete a post after 90 days.
  - However since we used Cloudinary to host our images, I had to make a route that gets pinged so any images over 90 days are deleted from the cloud as well.
  - Note: If a user manually deletes their post, their images are be deleted as well. 
- Our Cloudinary features include a widget to upload from local, social networks or by using their camera to take a new photo. We also gave users the ability to crop their photos before uploading.
- We deployed our front end to Netlify and are using their Forms feature for our Contact Us page.
- We used a custom theme built using Semantic UI, and used React Semantic UI for our components.
- We used a Facebook and Google login feature that verifies the user is logged into their account and checks our DB for their email.
- We added Google Analytics to track page views and different types of events.
- We added a couple polyfills since a high volume of our user base resides in South Korea (which use IE alot) to ensure a smooth experience across all browsers.
- We took used react-snapshot to help improve our SEO.
- We ensured our site looks fantastic on mobile as well as desktops.

### .env file you'll need to run locally

```
REACT_APP_API_ROUTE="yourApiRouteHere"
REACT_APP_CLOUD_NAME="cloudinaryCloudNameHere"
REACT_APP_CLOUD_FOLDER="cloudinaryFolderName"
REACT_APP_CLOUD_API_KEY="cloudinaryApiKeyHere"
REACT_APP_CLOUD_API_SECRET="cloudinaryApiSecretHere"
REACT_APP_IMG_DELETE_URL="cloudinaryDeleteByTokenUrl"
REACT_APP_FACEBOOK_APP_ID="facebookAppIdHere"
REACT_APP_GOOGLE_CLIENT_ID="googleClientIdHere"
REACT_APP_CAPTCHA_KEY="googleCaptchaKeyHere"
REACT_APP_ANALYTICS_KEY="googleAnalyticsKeyHere"
```

If you have any questions, let us know. Our GitHub's are at the top.
