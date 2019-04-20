import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import ListingForm from "./ListingForm";
import StyledContainer from "./_reusable/StyledContainer";
import FormMessages from "./_reusable/FormMessages";
import * as helpers from "../helpers/listing";
import { apiRequest } from "../helpers/api";
import useFormState from "../hooks/useFormState";
import useFormStatus from "../hooks/useFormStatus";
import useFormRequired from "../hooks/useFormRequired";
import { updateListing } from "../store/actions/listings";
import "./ListingForm.css";

const initStatus = { errorMsg: "", errorStatus: null };

function Update({ history, listing, user, updateListing }) {
  const { state, isProcessing, ...func } = useFormState(
    listing ? listing : helpers.initState,
    update
  );
  const { gender } = state;
  const { status, setStatus } = useFormStatus(initStatus);
  const { errorStatus, errorMsg } = status;
  const isFormFilled = useFormRequired(state, helpers.required);

  useEffect(() => {
    if (!listing) return;
    func.setState(listing);
  }, [listing]);

  function handleErr(err) {
    func.setProcessing(false);
    setStatus({ errorStatus: true, errorMsg: err });
  }

  function update() {
    if (!isFormFilled) return handleErr("Please fill in all required fields");
    if (!state.images.length) return handleErr("Minimum 1 image required");
    const { token } = user;
    const body = helpers.stringifyBody(state, null);
    const apiDeets = { url: `/posts/${state._id}`, method: "PUT", body, token };
    helpers.submitHelper(
      apiDeets,
      setStatus,
      func.setProcessing,
      "Update",
      history,
      updateListing
    );
  }

  async function deleteOldImages(e, { public_id, path }) {
    try {
      const urlAdd = `?public_ids=${public_id}`;
      await apiRequest(`/images/single${urlAdd}`, { method: "DELETE" });
      const images = state.images
        .filter(img => img.path !== path)
        .map(img => ({ ...img }));
      func.setState({ ...state, images });
    } catch (err) {
      console.log(err);
      setStatus({ errorStatus: true, errorMsg: err.message });
    }
  }

  const handleWidget = () =>
    helpers.openImgWidget(state, isFormFilled, func.setState, setStatus);

  return (
    <>
      <Helmet>
        <title>{`Edit ${state.petName} - Rescue Korea`}</title>
        <meta name="description" content="Edit your pet adoption listing" />
        <meta property="og:title" content={`Edit ${state.petName} - Rescue Korea`} />
        <meta property="og:description" content="Edit your pet adoption listing" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dastrong/image/upload/v1554288174/petChingus/UX/faviconRK.png"
        />
        <meta
          property="og:url"
          content={`https://rescuekorea.netlify.com/listing/${state._id}/edit`}
        />
      </Helmet>

      <StyledContainer
        topHeader="Edit your Listing"
        btmHeader="Please fill in all required fields"
      >
        <Form loading={isProcessing || !listing} error={errorStatus}>
          <ListingForm
            {...state}
            handleChange={func.handleChange}
            handleSubmit={func.handleSubmit}
            handleImgDeletion={deleteOldImages}
            openImgWidget={handleWidget}
            errorStatus={errorStatus}
            isFormFilled={isFormFilled}
            btnText="Edit Listing"
            pronoun={!gender ? "He/She's" : gender === "Male" ? "He's" : "She's"}
          />
          <FormMessages errorMsg={errorMsg} errorStatus={errorStatus} />
        </Form>
      </StyledContainer>
    </>
  );
}

const mapStateToProps = (state, { match }) => {
  let listing = state.listings.filter(listing => listing._id === match.params.id)[0];
  if (listing) {
    const [ageNum, agePeriod] = listing.age.split(" ");
    listing.ageNum = ageNum;
    listing.agePeriod = agePeriod;
    listing.adoptionFee = String(listing.adoptionFee);
  }
  return {
    listing,
    user: state.user.user,
  };
};

const mapDispatchToProps = { updateListing };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
