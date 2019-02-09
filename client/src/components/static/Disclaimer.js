import React from "react";
import { Segment, Header, Container } from "semantic-ui-react";

const Disclaimer = () => (
  <Segment basic inverted color="pink" style={{ margin: 0, padding: "35px 1.5em" }}>
    <Header
      as="h1"
      color="violet"
      content="Disclaimer"
      textAlign="center"
      style={{ textDecoration: "underline" }}
    />
    <Container color="violet">
      <p
        style={{
          color: "#3d0043",
          letterSpacing: "0.5px",
          textAlign: "center",
          lineHeight: "22px",
        }}
      >
        This is a free service for listing your pets for adoption in South Korea. We take
        no responsibility for any listings as all listed pets are user-generated, and we
        cannot verify any information regarding health, condition, or any other matter. We
        are not a shelter, and unfortunately do not have a way to accept unwanted pets.
        All content uploaded is the property of the submitter.
      </p>
    </Container>
  </Segment>
);

export default Disclaimer;
