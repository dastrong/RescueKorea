import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";
import "./BlurredLoader.css";

// used to show blur the background until everything is ready
// you need to wrap your component and pass an isLoading prop

const BlurredLoader = ({ isLoading, children }) => (
  <Dimmer.Dimmable className="customized" blurring dimmed={isLoading}>
    <Dimmer active={isLoading} inverted>
      <Loader content="Loading" size="large" />
    </Dimmer>
    {children}
  </Dimmer.Dimmable>
);

export default BlurredLoader;
