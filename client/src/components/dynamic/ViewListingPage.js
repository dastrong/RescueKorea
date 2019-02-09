import React from "react";
import { Grid, Container } from "semantic-ui-react";
import ViewListingImages from "./ViewListingImages";
import ViewListingInfo from "./ViewListingInfo";
import ViewListingStory from "./ViewListingStory";
import ViewListingContact from "./ViewListingContact";
import "./ViewListingPage.css";

export default ({ petInfo, openImageShowCase, user, handleDelete }) => (
  <Container>
    <Grid stackable>
      <Grid.Row columns={16}>
        <ViewListingImages
          images={petInfo.images || []}
          openImageShowCase={openImageShowCase}
        />
        <ViewListingInfo {...petInfo} />
        <ViewListingStory story={petInfo.description} />
        <ViewListingContact
          isOwner={user && (user.isAdmin || user.userId === petInfo.owner.id)}
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
);
