import React, { Fragment } from "react";
import Routes from "./Routes";
import Disclaimer from "../static/Disclaimer";
import Footer from "../static/Footer";

const SiteContent = props => {
  // need this to extend the first section
  // and keep the footer on the bottom
  // in large screen sizes or when there's no posts
  const btmSection = document.querySelector(".btm-section");
  let btmSectionHeight = 370;
  if (btmSection) {
    btmSectionHeight = btmSection.offsetHeight;
  }
  return (
    <Fragment>
      <section
        className="top-section"
        style={{ minHeight: `calc(100vh - ${btmSectionHeight}px)` }}
      >
        <Routes {...props} />
      </section>
      <section className="btm-section">
        <Disclaimer />
        <Footer />
      </section>
    </Fragment>
  );
};

export default SiteContent;
