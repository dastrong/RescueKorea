import React from "react";
import { Image } from "semantic-ui-react";
import StyledContainer from "../reusable/StyledContainer";

const ErrorNotFound = () => (
  <StyledContainer
    topHeader="We're Sorry!"
    btmHeader="Something went wrong or we couldn't find what you're looking for"
  >
    <Image src="/error.svg" fluid />
  </StyledContainer>
);

export default ErrorNotFound;
