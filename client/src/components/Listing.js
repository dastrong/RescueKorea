import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Container } from "semantic-ui-react";
import ListingImages from "./Listing/ListingImages";
import ListingInfo from "./Listing/ListingInfo";
import ListingStory from "./Listing/ListingStory";
import ListingContact from "./Listing/ListingContact";
import ImageShowCase from "./_reusable/ImageShowCase";
import { listingPlaceholderObj } from "./_reusable/Placeholders";
import { fetcher } from "../helpers";
import { addGooEvent } from "../helpers/analytics";
import "./Listing.css";

function Listing({ listing, isLoading, history, ...props }) {
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

  const handleDelete = async () => {
    try {
      const resp = await fetcher(`/posts/${petInfo._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      const post = await resp.json();
      if (!resp.ok) throw post;
      addGooEvent("Listing", "Deleted");
      props.updatePosts();
      history.push("/");
    } catch (err) {
      console.log(err);
      history.push("/error");
    }
  };

  return (
    <div className="listing-container">
      <Container>
        <Grid stackable>
          <Grid.Row columns={16}>
            <ListingImages images={petInfo.images} openImageShowCase={openShowCase} />
            <ListingInfo {...petInfo} />
            <ListingStory story={petInfo.description} />
            <ListingContact
              isOwner={
                props.user &&
                (props.user.isAdmin || props.user.userId === petInfo.owner.id)
              }
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
      <ImageShowCase
        images={petInfo.images}
        isOpen={isShowCaseOpen}
        targetImgId={targetImgId}
        closeImageShowCase={() => toggleShowCase(false)}
      />
    </div>
  );
}

const mapStateToProps = (state, { match }) => ({
  listing: state.listings.filter(listing => listing._id === match.params.id),
  isLoading: state.ui.isListingsLoading,
  // get user data
  // need to check if they're the owners of the listing or not
});

// const mapDispatchToProps = {
//   // deleting the post
// };

export default connect(mapStateToProps)(Listing);
