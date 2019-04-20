import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
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
import { trackGooPage } from "../helpers/analytics";

function Routes({ isAuthenticated, isServerError, history, location }) {
  const [minHeight, setMinHeight] = useState("100%");
  const { pathname } = location;

  useLayoutEffect(() => {
    const disclaimer = document.getElementById("disclaimer").offsetHeight;
    const footer = document.getElementById("footer").offsetHeight;
    setMinHeight(`calc(100vh - ${disclaimer}px - ${footer}px)`);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    trackGooPage(location.pathname);
  }, [pathname]);

  useEffect(() => {
    if (!isServerError) return;
    history.push("/error");
  }, [isServerError]);

  return (
    <section className="top-section" style={{ minHeight }}>
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
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isServerError: state.ui.isServerError,
});

export default withRouter(connect(mapStateToProps)(Routes));
