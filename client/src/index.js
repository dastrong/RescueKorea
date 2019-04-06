import "@babel/polyfill";
import "react-app-polyfill/ie11";
import "./semantic/dist/semantic.min.css";
import React, { useEffect } from "react";
import { render } from "react-snapshot";
import ReactGA from "react-ga";
import App from "./containers/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { getListings } from "./store/actions/listings";

function Site() {
  useEffect(() => {
    // load our analytics
    ReactGA.initialize(process.env.REACT_APP_ANALYTICS_KEY);
    // wakes up the server and grab all listings
    store.dispatch(getListings());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

render(<Site />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
