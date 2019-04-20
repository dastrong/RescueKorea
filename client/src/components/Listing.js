import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Grid, Container } from "semantic-ui-react";
import ListingImages from "./Listing/ListingImages";
import ListingInfo from "./Listing/ListingInfo";
import ListingStory from "./Listing/ListingStory";
import ListingContact from "./Listing/ListingContact";
import ImageShowCase from "./_reusable/ImageShowCase";
import { listingPlaceholderObj } from "./_reusable/Placeholders";
import { apiRequest } from "../helpers/api";
import { addGooEvent } from "../helpers/analytics";
import { deleteListing } from "../store/actions/listings";
import "./Listing.css";

function Listing({ listing, isLoading, isOwner, user, history, deleteListing }) {
  const [isShowCaseOpen, toggleShowCase] = React.useState(false);
  const [targetImgId, setTargetImgId] = React.useState(0);
  const [petInfo, setPetInfo] = React.useState(listingPlaceholderObj);

  useEffect(() => {
    // if our filter doesn't find a listing, push user to error page
    if (!isLoading && listing.length !== 1) return history.push("/error");
    if (listing.length === 1) return setPetInfo(listing[0]);
  }, [listing, isLoading]);

  function openShowCase(e) {
    addGooEvent("Listing", "Showcase opened");
    toggleShowCase(true);
    setTargetImgId(Number(e.target.id));
  }

  async function handleDelete() {
    try {
      const listing = await apiRequest(`/posts/${petInfo._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      addGooEvent("Listing", "Deleted");
      history.push("/");
      deleteListing(listing._id);
    } catch (err) {
      console.log(err);
      history.push("/error");
    }
  }

  return (
    <div className="listing-container">
      {petInfo._id && (
        <Helmet
          title={`Meet ${petInfo.petName} - Rescue Korea`}
          meta={[
            {
              name: "description",
              content: petInfo.description,
            },
            {
              property: "og:title",
              content: `Meet ${petInfo.petName} - Rescue Korea`,
            },
            {
              property: "og:description",
              content: petInfo.description,
            },
            {
              property: "og:url",
              content: `https://rescuekorea.netlify.com/listing/${petInfo._id}`,
            },
          ]}
        />
      )}
      <Container>
        <Grid stackable>
          <Grid.Row columns={16}>
            <ListingImages images={petInfo.images} openImageShowCase={openShowCase} />
            <ListingInfo {...petInfo} />
            <ListingStory story={petInfo.description} />
            <ListingContact
              isOwner={isOwner}
              postId={petInfo._id}
              petName={petInfo.petName}
              mainImg={petInfo.images[0]}
              contactName={petInfo.owner.name}
              contactEmail={petInfo.owner.email}
              adoptionFee={petInfo.adoptionFee}
              handleDelete={handleDelete}
            />
          </Grid.Row>
        </Grid>
      </Container>
      {isShowCaseOpen && (
        <ImageShowCase
          images={petInfo.images}
          isOpen={isShowCaseOpen}
          targetImgId={targetImgId}
          closeImageShowCase={() => toggleShowCase(false)}
        />
      )}
    </div>
  );
}

const mapStateToProps = ({ listings, ui, user }, { match }) => {
  const listing = listings.filter(listing => listing._id === match.params.id);
  return {
    listing,
    isLoading: ui.isListingsLoading,
    isOwner:
      listing[0] &&
      user.isAuthenticated &&
      (user.user.isAdmin || user.user.userId === listing[0].owner.id),
    user: user.user,
  };
};

const mapDispatchToProps = { deleteListing };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing);
