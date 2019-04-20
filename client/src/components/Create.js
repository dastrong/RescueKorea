import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import ListingForm from "./ListingForm";
import StyledContainer from "./_reusable/StyledContainer";
import FormMessages from "./_reusable/FormMessages";
import * as helpers from "../helpers/listing";
import useFormState from "../hooks/useFormState";
import useFormStatus from "../hooks/useFormStatus";
import useFormRequired from "../hooks/useFormRequired";
import { createListing } from "../store/actions/listings";
import "./ListingForm.css";

const initStatus = { errorMsg: "", errorStatus: null };

function Create({ history, user, createListing }) {
  const { state, isProcessing, ...func } = useFormState(helpers.initState, create);
  const { gender, images } = state;
  const { status, setStatus } = useFormStatus(initStatus);
  const { errorStatus, errorMsg } = status;
  const isFormFilled = useFormRequired(state, helpers.required);

  function handleErr(err) {
    func.setProcessing(false);
    setStatus({ errorStatus: true, errorMsg: err });
  }

  function create() {
    if (!isFormFilled) return handleErr("Please fill in all required fields");
    if (!images.length) return handleErr("Minimum 1 image required");
    const { userId, fullName, email, token } = user;
    const owner = { id: userId, name: fullName, email };
    const body = helpers.stringifyBody(state, owner);
    const apiDeets = { url: "/posts", method: "POST", body, token };
    helpers.submitHelper(
      apiDeets,
      setStatus,
      func.setProcessing,
      "Create",
      history,
      createListing
    );
  }

  async function deleteNewImages(e, { delete_token, path }) {
    const start = process.env.REACT_APP_IMG_DELETE_URL;
    const end = `?token=${delete_token}`;
    const imageCopies = images.filter(img => img.path !== path).map(img => ({ ...img }));
    func.setState({ ...state, images: imageCopies });
    fetch(start + end, { method: "POST" });
  }

  const handleWidget = () =>
    helpers.openImgWidget(state, isFormFilled, func.setState, setStatus);

  return (
    <>
      <Helmet>
        <title>Create Listing - Rescue Korea</title>
        <meta
          name="description"
          content="Create a pet adoption listing for other to view"
        />
      </Helmet>

      <StyledContainer
        topHeader="Create a Listing"
        btmHeader="Please fill in all required fields"
      >
        <Form loading={isProcessing} error={errorStatus}>
          <ListingForm
            {...state}
            handleChange={func.handleChange}
            handleSubmit={func.handleSubmit}
            handleImgDeletion={deleteNewImages}
            openImgWidget={handleWidget}
            errorStatus={errorStatus}
            isFormFilled={isFormFilled}
            btnText="Submit Listing"
            pronoun={!gender ? "He/She's" : gender === "Male" ? "He's" : "She's"}
          />
          <FormMessages errorMsg={errorMsg} errorStatus={errorStatus} />
        </Form>
      </StyledContainer>
    </>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

const mapDispatchToProps = { createListing };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
