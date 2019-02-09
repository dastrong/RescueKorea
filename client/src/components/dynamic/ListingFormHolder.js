import React from "react";
import StyledContainer from "../reusable/StyledContainer";
import ListingForm from "./ListingForm";
import "./ListingForm.css";

// history comes from react router
const ListingFormHolder = ({ history, user, post, isEdit, updatePosts }) => (
  <StyledContainer
    topHeader={`${isEdit ? "Edit your" : "Create a"} Listing`}
    btmHeader="Please fill in all required fields"
  >
    <ListingForm
      history={history}
      user={user}
      post={isEdit ? post : null}
      isEdit={isEdit}
      updatePosts={updatePosts}
    />
  </StyledContainer>
);

export default ListingFormHolder;
