import React from "react";
import { Grid } from "semantic-ui-react";
import CardComponent from "./CardComponent";
import BlurredLoader from "./BlurredLoader";

const CardList = ({ pets, isLoading, ...sizes }) => (
  <BlurredLoader isLoading={isLoading}>
    <Grid style={{ justifyContent: "center" }}>
      {pets.map(({ _id, images, ...rest }) => (
        <CardComponent key={_id} id={_id} image={images[0]} {...rest} {...sizes} />
      ))}
    </Grid>
  </BlurredLoader>
);

export default CardList;
