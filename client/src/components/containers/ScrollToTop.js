import React, { useState, useEffect } from "react";
import { throttle } from "lodash";
import { Icon } from "semantic-ui-react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [isVisible, toggle] = useState(window.scrollY > 0);

  const shouldToggle = () => toggle(window.scrollY);

  useEffect(() => document.addEventListener("scroll", throttle(shouldToggle, 1000)), []);

  const handleClick = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return (
    <Icon
      name="angle double up"
      color="olive"
      onClick={handleClick}
      className="scroll-to-top"
      style={isVisible ? { opacity: 1, cursor: "pointer" } : { visibility: "hidden" }}
    />
  );
}
