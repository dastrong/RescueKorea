// MOVE TO COMPONENTS
import React from "react";
import Footer from "../components/static/Footer";
import Disclaimer from "../components/static/Disclaimer";
import Routes from "../components/containers/Routes";
import NavBar from "../components/containers/NavBar";
import ScrollToTop from "../components/containers/ScrollToTop";

export default () => (
  <>
    <NavBar />
    <Routes />
    <Disclaimer />
    <Footer />
    <ScrollToTop />
  </>
);
