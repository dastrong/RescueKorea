import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import StyledContainer from "../_reusable/StyledContainer";

const EmptyPlaceholder = () => (
  <StyledContainer
    topHeader="No Listings Found"
    btmHeader="Check back later or create a listing for your pet"
  >
    <Button
      as={Link}
      to="/create"
      color="purple"
      size="large"
      content="Create a Listing"
    />
  </StyledContainer>
);

export default EmptyPlaceholder;
