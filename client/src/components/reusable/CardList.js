import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import CardComponent from "./CardComponent";
import ImgWithPlaceHolder from "./ImgWithPlaceholder";
import { CardPlaceholder } from "./Placeholders";

// how many placeholder cards?
const numOfCards = 6;

export default ({ showPlaceholders, listings }) => (
  <Grid style={{ justifyContent: "center" }}>
    {showPlaceholders
      ? Array.from(Array(numOfCards)).map((q, i) => <CardPlaceholder key={`temp-${i}`} />)
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
