import "@babel/polyfill";
import "react-app-polyfill/ie11";
import React from "react";
import { render } from "react-snapshot";
import "./index.css";
import NavBar from "./components/containers/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./semantic/dist/semantic.min.css";

const Site = () => (
  <Router>
    <NavBar />
  </Router>
);

render(<Site />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
