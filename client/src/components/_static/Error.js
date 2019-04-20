import React from "react";
import { Helmet } from "react-helmet";
import { Image } from "semantic-ui-react";
import StyledContainer from "../_reusable/StyledContainer";

const Error = () => (
  <>
    <Helmet>
      <title>Error - Rescue Korea</title>
    </Helmet>

    <StyledContainer
      topHeader="We're Sorry!"
      btmHeader="Something went wrong or we couldn't find what you're looking for"
    >
      <Image src="/error.svg" fluid />
    </StyledContainer>
  </>
);

export default Error;
