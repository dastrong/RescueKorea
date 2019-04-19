import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
// import { Helmet } from "react-helmet";
import Policy from "./_static/Policy";
import Error from "./_static/Error";
import BillBoard from "./_static/BillBoard";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Listings from "./Listings";
import Listing from "./Listing";
import Create from "./Create";
import Update from "./Update";
import Contact from "./Contact";

const Routes = ({ isAuthenticated }) => (
  <section className="top-section" style={{ marginTop: "65px", padding: "25px 0" }}>
    <Switch>
      <Route exact path="/" component={BillBoard} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/listing/:id" component={Listing} />
      <Route exact path="/listing/:id/edit" component={Update} />
      <Route exact path="/policy" component={Policy} />
      <Route exact path="/listings" component={Listings} />
      <Route exact path="/contact" component={Contact} />
      <Route
        exact
        path="/create"
        render={props =>
          isAuthenticated ? <Create {...props} /> : <Redirect to="/login" />
        }
      />
      <Route component={Error} />
    </Switch>
  </section>
);

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Routes));
