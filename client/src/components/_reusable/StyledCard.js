import React from "react";
import { Link } from "react-router-dom";
import { Card, Segment, Header, Button, Grid } from "semantic-ui-react";
import "./StyledCard.css";

const StyledCard = ({ image, petName, gender, location, button }) => (
  <Grid.Column mobile={16} tablet={8} computer={5}>
    <Segment inverted color="pink" className="individual-card">
      <Card fluid>
        {image}
        <Card.Content>
          <Header as="h2" color="violet" content={petName} />
          <Card.Description>{gender}</Card.Description>
          <Card.Description>{location}</Card.Description>
        </Card.Content>
        <Button
          attached="bottom"
          as={Link}
          color="olive"
          style={{ height: "36px" }}
          {...button}
        />
      </Card>
    </Segment>
  </Grid.Column>
);

export default StyledCard;
