import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./_static/Footer";
import Disclaimer from "./_static/Disclaimer";
import Routes from "./Routes";
import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop";

export default () => (
  <>
    <Helmet>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rescue Korea" />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/dastrong/image/upload/f_auto,h_200,q_87,w_240/v1554288174/petChingus/UX/faviconRK.png"
      />
    </Helmet>
    <NavBar />
    <Routes />
    <Disclaimer />
    <Footer />
    <ScrollToTop />
  </>
);
