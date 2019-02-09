import React from "react";
import { Grid, Segment, Header, Icon, Divider } from "semantic-ui-react";

export default props => (
  <Grid.Column stretched width={7}>
    <Segment inverted color="pink">
      <Header as="h1" dividing textAlign="center">
        Hey! I'm <span style={{ color: "#3d0043" }}>{props.petName}</span>.
      </Header>
      <div className="listing-details">
        {mainDetails.map(info => (
          <Item {...info} content={props[info.key]} className="listing-details-item" />
        ))}
        <Item
          label={props.gender === "Male" ? "Neutered" : "Spayed"}
          content={
            <Icon
              name={props.spayed ? "check" : "times"}
              color={props.spayed ? "green" : "red"}
            />
          }
          className="listing-details-item"
        />
        <Item
          label="Vaccinated"
          content={
            <Icon
              name={props.vaccinated ? "check" : "times"}
              color={props.vaccinated ? "green" : "red"}
            />
          }
          className="listing-details-item"
        />
      </div>
      <Divider />
      <ProfileHolder {...props} />
    </Segment>
  </Grid.Column>
);

const ProfileHolder = props => (
  <div className="extra-details">
    <Header as="h3" color="violet" textAlign="center" content="My Interaction Profile" />
    <Profile details={goodWithDetails} checkedVals={props.goodWith} />
    <Divider />
    <Header as="h3" color="violet" textAlign="center" content="My Training Profile" />
    <Profile details={trainedDetails} checkedVals={props.trained} />
  </div>
);

const Profile = ({ details, checkedVals }) => (
  <div className="listing-details">
    {details.map(info => {
      const [name, color] = checkedVals.includes(info.label)
        ? ["check", "green"]
        : ["times", "red"];
      return (
        <Item
          key={info.key}
          className="extra-details-item"
          label={info.label}
          content={<Icon name={name} color={color} />}
        />
      );
    })}
  </div>
);

const Item = ({ label, content, className }) => (
  <div className={className}>
    <Header as="h4" content={label} color="violet" />
    {content}
  </div>
);

const mainDetails = [
  { label: "Breed", key: "breed" },
  { label: "Gender", key: "gender" },
  { label: "Age", key: "age" },
  { label: "Color", key: "color" },
  { label: "Size", key: "size" },
  { label: "Location", key: "location" },
];

const goodWithDetails = [
  { label: "Kids", key: "goodWithKids" },
  { label: "Dogs", key: "goodWithDogs" },
  { label: "Cats", key: "goodWithCats" },
];

const trainedDetails = [
  { label: "House", key: "houseTrained" },
  { label: "Leash", key: "leashTrained" },
  { label: "Crate", key: "crateTrained" },
  { label: "Litter", key: "litterTrained" },
];
