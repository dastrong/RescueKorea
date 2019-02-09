import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import ListingPolicy from "../static/ListingPolicy";
import ErrorNotFound from "../static/ErrorNotFound";
import AuthHolder from "../dynamic/AuthHolder";
import FeaturedPosts from "../dynamic/FeaturedPosts";
import LatestListings from "../dynamic/LatestListings";
import ViewListingHolder from "../dynamic/ViewListingHolder";
import ListingFormHolder from "../dynamic/ListingFormHolder";
import ContactForm from "../dynamic/ContactForm";

const Routes = ({ handleUser, updatePosts, user, posts, isLoading }) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <Fragment>
          <Helmet>
            <title>Adopt a Korean Pet || Home</title>
            <meta name="keywords" content="Adopt,Pet,Korean animals,Adopt a Korean Pet" />
            <meta name="description" content="Adopt a Korean pet today" />
          </Helmet>
          <FeaturedPosts
            // pass the last 4 posts down
            posts={posts.slice(posts.length <= 4 ? 0 : posts.length - 4)}
            totalPostsLength={posts.length}
          />
        </Fragment>
      )}
    />
    <Route
      exact
      path="/login"
      render={() => (
        <Fragment>
          <Helmet>
            <title>Adopt a Korean Pet || Login</title>
            <meta name="keywords" content="Adopt,Pet,Korean animals,Adopt a Korean Pet" />
            <meta
              name="description"
              content="Login to your account here to adopt a Korean pet today"
            />
          </Helmet>
          <AuthHolder handleUser={handleUser} />
        </Fragment>
      )}
    />
    <Route
      exact
      path="/signup"
      render={() => (
        <Fragment>
          <Helmet>
            <title>Adopt a Korean Pet || Register</title>
            <meta name="keywords" content="Adopt,Pet,Korean animals,Adopt a Korean Pet" />
            <meta
              name="description"
              content="Register here to adopt a Korean pet today"
            />
          </Helmet>
          <AuthHolder handleUser={handleUser} />
        </Fragment>
      )}
    />
    <Route
      exact
      path="/listing/:id"
      render={({ match, history }) => {
        const post = posts.filter(post => post._id === match.params.id);
        return (
          <Fragment>
            <Helmet>
              <title>Adopt a Korean Pet || View Pet</title>
              <meta
                name="keywords"
                content="Adopt,Pet,Korean animals,Adopt a Korean Pet"
              />
              <meta name="description" content="View one of our Korean pet listings" />
            </Helmet>
            <ViewListingHolder
              user={user}
              isLoading={isLoading}
              post={post}
              match={match}
              history={history}
              updatePosts={updatePosts}
            />
          </Fragment>
        );
      }}
    />
    <Route
      exact
      path="/listing/:id/edit"
      render={({ match, history }) => {
        let post = posts.filter(post => post._id === match.params.id);
        let ageNum, agePeriod;
        if (post.length) {
          [ageNum, agePeriod] = post[0].age.split(" ");
          post[0].ageNum = ageNum;
          post[0].agePeriod = agePeriod;
          post[0].adoptionFee = String(post[0].adoptionFee);
        }
        return (
          <Fragment>
            <Helmet>
              <title>Adopt a Korean Pet || Edit Pet</title>
              <meta
                name="keywords"
                content="Adopt,Pet,Korean animals,Adopt a Korean Pet"
              />
              <meta name="description" content="Edit your Korean pet listings" />
            </Helmet>
            <ListingFormHolder
              history={history}
              user={user}
              post={post}
              isEdit={true}
              updatePosts={updatePosts}
            />
          </Fragment>
        );
      }}
    />
    <Route
      exact
      path="/listingpolicy"
      render={() => (
        <Fragment>
          <Helmet>
            <title>Adopt a Korean Pet || Listing Policy</title>
            <meta name="keywords" content="Adopt,Pet,Korean animals,Adopt a Korean Pet" />
            <meta
              name="description"
              content="Our listing policy which should be read by everybody wanting to list a Korean pet for adoption"
            />
          </Helmet>
          <ListingPolicy />
        </Fragment>
      )}
    />
    <Route
      exact
      path="/listings"
      render={() => (
        <Fragment>
          <Helmet>
            <title>Adopt a Korean Pet || View Listings</title>
            <meta name="keywords" content="Adopt,Pet,Korean animals,Adopt a Korean Pet" />
            <meta
              name="description"
              content="View, search and filter all of our Korean pet listings"
            />
          </Helmet>
          <LatestListings posts={posts} />
        </Fragment>
      )}
    />
    <Route
      exact
      path="/contactus"
      render={() => (
        <Fragment>
          <Helmet>
            <title>Adopt a Korean Pet || Contact Us</title>
            <meta name="keywords" content="Adopt,Pet,Korean animals,Adopt a Korean Pet" />
            <meta name="description" content="Contact us" />
          </Helmet>
          <ContactForm user={user} />
        </Fragment>
      )}
    />
    <Route
      exact
      path="/create"
      render={({ history }) =>
        !user ? (
          <Redirect to="/login" />
        ) : (
          <Fragment>
            <Helmet>
              <title>Adopt a Korean Pet || View Listings</title>
              <meta
                name="keywords"
                content="Adopt,Pet,Korean animals,Adopt a Korean Pet"
              />
              <meta
                name="description"
                content="View, search and filter all of our Korean pet listings"
              />
            </Helmet>
            <ListingFormHolder
              history={history}
              user={user}
              isEdit={false}
              updatePosts={updatePosts}
            />
          </Fragment>
        )
      }
    />
    <Route component={ErrorNotFound} />
  </Switch>
);

export default Routes;
