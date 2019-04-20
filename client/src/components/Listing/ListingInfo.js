import React from "react";
import { Grid, Segment, Header, Icon, Divider } from "semantic-ui-react";

function getIconDeets(isLoading, prop) {
  return isLoading ? ["spinner", "purple"] : prop ? ["check", "green"] : ["times", "red"];
}

export default ({ spayed, vaccinated, petName, goodWith, trained, ...otherInfo }) => {
  const isLoading = spayed === null;
  const [spayedIcnName, spayedIcnColor] = getIconDeets(isLoading, spayed);
  const [vaccinIcnName, vaccinIcnColor] = getIconDeets(isLoading, vaccinated);
  return (
    <Grid.Column stretched width={7}>
      <Segment inverted color="pink">
        <PetNameHolder petName={petName} isLoading={isLoading} />
        <div className="listing-details">
          <InfoHolder otherInfo={otherInfo} />
          <ImportantInfoHolder
            label={otherInfo.gender === "Male" ? "Neutered" : "Spayed"}
            iconName={spayedIcnName}
            iconColor={spayedIcnColor}
            isLoading={isLoading}
          />
          <ImportantInfoHolder
            label="Vaccinated"
            iconName={vaccinIcnName}
            iconColor={vaccinIcnColor}
            isLoading={isLoading}
          />
        </div>
        <Divider />
        <ProfileHolder goodWith={goodWith} trained={trained} isLoading={isLoading} />
      </Segment>
    </Grid.Column>
  );
};

const PetNameHolder = ({ isLoading, petName }) => (
  <Header as="h1" dividing textAlign="center">
    {!isLoading ? (
      <>
        Hey! I'm <span style={{ color: "#3d0043" }}>{petName}</span>.
      </>
    ) : (
      petName
    )}
  </Header>
);

const InfoHolder = ({ otherInfo }) =>
  mainDetails.map(info => (
    <Item {...info} content={otherInfo[info.key]} className="listing-details-item" />
  ));

const ImportantInfoHolder = ({ isLoading, label, iconName, iconColor }) => (
  <Item
    label={label}
    content={<Icon loading={isLoading} name={iconName} color={iconColor} />}
    className="listing-details-item"
  />
);

const ProfileHolder = ({ goodWith, trained, isLoading }) => (
  <div className="extra-details">
    <Header as="h3" color="violet" textAlign="center" content="My Interaction Profile" />
    <Profile details={goodWithDetails} checked={goodWith} isLoading={isLoading} />
    <Divider />
    <Header as="h3" color="violet" textAlign="center" content="My Training Profile" />
    <Profile details={trainedDetails} checked={trained} isLoading={isLoading} />
  </div>
);

const Profile = ({ details, checked, isLoading }) => (
  <div className="listing-details">
    {details.map(info => {
      const [name, color] = getIconDeets(isLoading, checked.includes(info.label));
      return (
        <Item
          key={info.key}
          className="extra-details-item"
          label={info.label}
          content={<Icon loading={isLoading} name={name} color={color} />}
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
