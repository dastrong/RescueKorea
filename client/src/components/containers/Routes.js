import React from "react";
// import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// import { Route, Switch, Redirect } from "react-router-dom";
// import { Helmet } from "react-helmet";
import ListingPolicy from "../static/ListingPolicy";
import ErrorNotFound from "../static/ErrorNotFound";
import BillBoard from "../static/BillBoard";
import AuthHolder from "../dynamic/AuthHolder";
// import FeaturedPosts from "../dynamic/FeaturedPosts";
import ListingsPage from "../../containers/ListingsPage";
// import ViewListingHolder from "../dynamic/ViewListingHolder";
// import ListingFormHolder from "../dynamic/ListingFormHolder";
import ContactForm from "../dynamic/ContactForm";

const Routes = () => (
  <section className="top-section" style={{ marginTop: "65px", padding: "25px 0" }}>
    <Switch>
      <Route exact path="/" component={BillBoard} />
      <Route exact path="/login" component={AuthHolder} />
      <Route exact path="/signup" component={AuthHolder} />
      {/* <Route
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
      }} */}
      />
      {/* <Route
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
    /> */}
      <Route exact path="/listingpolicy" component={ListingPolicy} />
      <Route exact path="/listings" component={ListingsPage} />
      <Route exact path="/contactus" component={ContactForm} />
      {/* <Route
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
    /> */}
      <Route component={ErrorNotFound} />
    </Switch>
  </section>
);

export default Routes;
