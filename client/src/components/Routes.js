import React from "react";
import { Route, Switch } from "react-router-dom";
// import { Route, Switch, Redirect } from "react-router-dom";
// import { Helmet } from "react-helmet";
import Policy from "./_static/Policy";
import Error from "./_static/Error";
import BillBoard from "./_static/BillBoard";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Listings from "./Listings";
import Listing from "./Listing";
// import ListingFormHolder from "../dynamic/ListingFormHolder";
import Contact from "./Contact";

const Routes = () => (
  <section className="top-section" style={{ marginTop: "65px", padding: "25px 0" }}>
    <Switch>
      <Route exact path="/" component={BillBoard} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/listing/:id" component={Listing} />
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
      <Route exact path="/policy" component={Policy} />
      <Route exact path="/listings" component={Listings} />
      <Route exact path="/contact" component={Contact} />
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
      <Route component={Error} />
    </Switch>
  </section>
);

export default Routes;
