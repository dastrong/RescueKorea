import React from "react";
import { Link } from "react-router-dom";
import StyledContainer from "../reusable/StyledContainer";
import { Grid, Button, Icon, Header, Divider, Responsive } from "semantic-ui-react";

const randomQuote = () => Math.floor(Math.random() * (quotes.length - 1));
const btnStyle = { margin: "10px 0 -10px", width: "200px", display: "block" };
const icnStyle = { marginBottom: "10px", fontSize: "2.5em" };
const divStyle = { height: "35%" };
const pStyle = { userSelect: "none", cursor: "pointer" };
const quotes = [
  "A dog is the only thing on earth that loves you more than he loves himself.",
  "Happiness is a warm puppy.",
  "Love is a four legged word.",
  "The road to our hearts are paved with paw prints.",
  "A house is not a home without a pet.",
  "Pets are like potato chips. It's hard to have just one.",
  "Never trust a person that doesn't trust dogs.",
  "Wake up. Hug dog. Have a good day.",
  "Pets are not our whole lives, but they make our lives whole.",
  "Need a life goal? Pet every dog.",
  "Time spent with cats is never wasted.",
  "Cats choose us, we don't own them.",
  "What greater gift than the love of a cat?",
  "The smallest feline is a masterpiece.",
];

export default function BillBoard() {
  const [ind, toggle] = React.useState(randomQuote());

  return (
    <StyledContainer
      topHeader="The New Rescue Korea"
      btmHeader={
        <p style={pStyle} onClick={() => toggle(randomQuote)}>
          {quotes[ind]}
        </p>
      }
    >
      <Grid columns={2} stackable textAlign="center" style={{ margin: "10px 0 0" }}>
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header icon>
              <Icon name="search" style={icnStyle} />
              Looking to adopt?
              <Button
                as={Link}
                to="/listings"
                size="large"
                color="blue"
                content="View Listings"
                style={btnStyle}
              />
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header icon>
              <Icon name="upload" style={icnStyle} />
              Have an animal to share?
              <Button
                as={Link}
                to="/create"
                size="large"
                color="green"
                content="Create Listing"
                style={btnStyle}
              />
            </Header>
          </Grid.Column>
          <Responsive minWidth="768">
            <Divider vertical style={divStyle}>
              Or
            </Divider>
          </Responsive>
        </Grid.Row>
      </Grid>
    </StyledContainer>
  );
}
