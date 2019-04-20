import React, { useState, useEffect } from "react";
import { Grid, Icon } from "semantic-ui-react";
import StyledCard from "./StyledCard";
import ImgWithPlaceHolder from "./ImgWithPlaceholder";
import { CardPlaceholder } from "./Placeholders";
import useScreenSize from "../../hooks/useScreenSize";

export default ({ showPlaceholders, listings }) => {
  const isMobile = useScreenSize();
  const [numOfCards, setNumOfCards] = useState(isMobile ? 3 : 6);

  useEffect(() => {
    setNumOfCards(isMobile ? 3 : 6);
  }, [isMobile]);

  return (
    <Grid style={{ justifyContent: "center" }}>
      {showPlaceholders
        ? Array.from(Array(numOfCards)).map((q, i) => (
            <CardPlaceholder key={`temp-${i}`} />
          ))
        : listings.map(({ _id, image, petName, location, gender }) => (
            <StyledCard
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
              button={{
                to: `/listing/${_id}`,
                loading: false,
                content: `View ${petName}`,
              }}
            />
          ))}
    </Grid>
  );
};
