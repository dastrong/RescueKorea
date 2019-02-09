import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Segment, Header, Button, Grid } from "semantic-ui-react";
import ImgWithPlaceHolder from "./ImgWithPlaceholder";
import "./CardComponent.css";

const CardComponent = ({
  image,
  petName,
  gender,
  location,
  id,
  mobile,
  tablet,
  computer,
}) => (
  <Grid.Column key={id} mobile={mobile} tablet={tablet} computer={computer}>
    <Segment inverted color="pink" className="individual-card">
      <Card fluid>
        <ImgWithPlaceHolder src={image.url} alt="Korean pet for adoption - main image" />
        <Card.Content>
          <Header as="h2" color="violet" content={petName} />
          <Card.Description>
            <Icon name={gender.toLowerCase()} color="violet" />
            {gender}
          </Card.Description>
          <Card.Description>
            <Icon name="map marker alternate" color="violet" />
            {location}
          </Card.Description>
        </Card.Content>
        <Button
          attached="bottom"
          as={Link}
          to={`/listing/${id}`}
          color="olive"
          content={`View ${petName}`}
        />
      </Card>
    </Segment>
  </Grid.Column>
);

export default CardComponent;
