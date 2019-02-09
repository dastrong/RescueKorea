import React from "react";
import { Segment, Grid, Header } from "semantic-ui-react";

const ViewListingStory = ({ story }) => (
  <Grid.Column style={{ paddingTop: "14px" }} width={16}>
    <Segment inverted color="pink" className="listing-story">
      <Header as="h2" color="violet" content="More About Me" />
      <p>{story}</p>
    </Segment>
  </Grid.Column>
);

export default ViewListingStory;
