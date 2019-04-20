import React from "react";
import Footer from "./_static/Footer";
import Disclaimer from "./_static/Disclaimer";
import Routes from "./Routes";
import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop";

export default () => (
  <>
    <NavBar />
    <Routes />
    <Disclaimer />
    <Footer />
    <ScrollToTop />
  </>
);
