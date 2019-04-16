import React, { useEffect } from "react";
import { connect } from "react-redux";
import ImageShowCase from "../reusable/ImageShowCase";
import ViewListingPage from "../dynamic/ViewListingPage";
import { fetcher } from "../../helpers";
import { addGooEvent } from "../../helpers/analytics";
import { listingPlaceholderObj } from "../reusable/Placeholders";

function ListingPage({ listing, history, ...props }) {
  const isLoading = true;
  // function ListingPage({ listing, isLoading, history, ...props }) {
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
      <ViewListingPage
        user={props.user}
        petInfo={petInfo}
        openImageShowCase={openShowCase}
        handleDelete={handleDelete}
      />
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

export default connect(mapStateToProps)(ListingPage);
