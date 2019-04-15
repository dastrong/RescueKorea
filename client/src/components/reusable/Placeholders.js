import React from "react";
import { Placeholder } from "semantic-ui-react";
import CardComponent from "./CardComponent";

// ListingsPage
export const CardPlaceholder = () => (
  <CardComponent
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
);

// ListingPage
export const listingPlaceholderObj = () => {
  return {
    owner: {
      id: "",
      name: <LinePlaceholder isContact={true} />,
      email: <LinePlaceholder isContact={true} />,
    },
    goodWith: [],
    trained: [],
    images: [],
    _id: "",
    petName: (
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    ),
    type: "",
    breed: <LinePlaceholder />,
    gender: <LinePlaceholder />,
    size: <LinePlaceholder />,
    color: <LinePlaceholder />,
    description: <ParagraphPlaceholder />,
    location: <LinePlaceholder />,
    adoptionFee: <LinePlaceholder isContact={true} />,
    spayed: null,
    vaccinated: null,
    age: <LinePlaceholder />,
    createdAt: "",
  };
};

// CardList
const LoaderLine = ({ length }) => (
  <Placeholder>
    <Placeholder.Line length={length} />
  </Placeholder>
);

// ListingPage
const LinePlaceholder = ({ isContact }) => (
  <Placeholder className={isContact ? "" : "listing-placeholder"}>
    <Placeholder.Line />
  </Placeholder>
);

// ListingPage
const ParagraphPlaceholder = () => (
  <Placeholder>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
);
