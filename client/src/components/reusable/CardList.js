import React from "react";
import { Grid, Placeholder, Icon } from "semantic-ui-react";
import CardComponent from "./CardComponent";
import ImgWithPlaceHolder from "./ImgWithPlaceholder";

const LoaderLine = ({ length }) => (
  <Placeholder>
    <Placeholder.Line length={length} />
  </Placeholder>
);

export default ({ showPlaceholders, listings }) => (
  <Grid style={{ justifyContent: "center" }}>
    {showPlaceholders
      ? Array.from(Array(6)).map((q, i) => (
          <CardComponent
            key={`temp-${i}`}
            image={
              <Placeholder style={{ maxWidth: "100%" }}>
                <Placeholder.Image rectangular />
              </Placeholder>
            }
            petName={<LoaderLine length="long" />}
            gender={<LoaderLine length="short" />}
            location={<LoaderLine length="medium" />}
            button={{ to: "#", loading: true, content: "" }}
          />
        ))
      : listings.map(({ _id, image, petName, location, gender }) => (
          <CardComponent
            key={_id}
            id={_id}
            image={<ImgWithPlaceHolder src={image} alt={petName} />}
            petName={petName}
            gender={
              <>
                <Icon name={gender.toLowerCase()} color="violet" />
                {gender}
              </>
            }
            location={
              <>
                <Icon name="map marker alternate" color="violet" />
                {location}
              </>
            }
            button={{ to: `/listing/${_id}`, loading: false, content: `View ${petName}` }}
          />
        ))}
  </Grid>
);
