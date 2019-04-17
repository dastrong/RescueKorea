import React from "react";
import { Container, Segment, Header } from "semantic-ui-react";
import "./StyledContainer.css";

const StyledContainer = ({ children, topHeader, btmHeader }) => (
  <Container className="styled-container">
    <Segment inverted color="pink">
      <Segment>
        <Header
          as="h1"
          color="violet"
          content={topHeader}
          dividing
          className="topHeader"
        />
        <Header size="tiny" className="btmHeader">
          {btmHeader}
        </Header>
        {children}
      </Segment>
    </Segment>
  </Container>
);

export default StyledContainer;
