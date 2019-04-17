import React, { Fragment } from "react";
import {
  genderOpts,
  typeOpts,
  ageOpts,
  sizeOpts,
  goodWithOpts,
  trainedOpts,
} from "../../helpers/dropOpts";
import {
  Form,
  Dropdown,
  Input,
  TextArea,
  Image,
  Segment,
  Label,
  Popup,
  Button,
} from "semantic-ui-react";

const ListingFormFields = ({
  handleChange,
  handleSubmit,
  openImgWidget,
  handleImgDeletion,
  pronoun,
  formErrors,
  errorStatus,
  isEdit,
  ...vals
}) => (
  <Fragment>
    <Form.Group widths="equal">
      <Form.Select
        fluid
        error={formErrors.includes("type")}
        required
        label="Animal Type"
        name="type"
        placeholder="Animal Type"
        options={typeOpts}
        value={vals.type}
        onChange={handleChange}
      />
      <Form.Select
        fluid
        error={formErrors.includes("gender")}
        required
        label="Gender"
        name="gender"
        placeholder="Gender"
        options={genderOpts}
        value={vals.gender}
        onChange={handleChange}
      />
      <Form.Select
        fluid
        error={formErrors.includes("size")}
        required
        label="Size"
        name="size"
        placeholder="Size"
        options={sizeOpts}
        value={vals.size}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Field required>
        <label>Breed</label>
        <Input
          fluid
          error={formErrors.includes("breed")}
          name="breed"
          placeholder="Breed"
          value={vals.breed}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field required>
        <label>Color</label>
        <Input
          fluid
          error={formErrors.includes("color")}
          name="color"
          placeholder="Color"
          value={vals.color}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field required>
        <label>Age</label>
        <Input
          fluid
          error={formErrors.includes("ageNum")}
          name="ageNum"
          type="number"
          label={
            <Dropdown
              name="agePeriod"
              options={ageOpts}
              value={vals.agePeriod}
              onChange={handleChange}
            />
          }
          labelPosition="right"
          placeholder="Age"
          value={vals.ageNum}
          min="1"
          max="23"
          onChange={handleChange}
        />
      </Form.Field>
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Field required>
        <label>Pet Name</label>
        <Input
          fluid
          error={formErrors.includes("petName")}
          name="petName"
          placeholder="Pet Name"
          value={vals.petName}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field required>
        <label>Location</label>
        <Input
          fluid
          error={formErrors.includes("location")}
          name="location"
          value={vals.location}
          icon="map marker alternate"
          iconPosition="left"
          placeholder="Location"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field required>
        <label>Adoption Fee</label>
        <Input
          fluid
          error={formErrors.includes("adoptionFee")}
          type="number"
          name="adoptionFee"
          value={vals.adoptionFee}
          icon="won sign"
          iconPosition="left"
          placeholder="Adoption Fee"
          min="0"
          max="10000000"
          onChange={handleChange}
        />
      </Form.Field>
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Dropdown
        fluid
        multiple
        selection
        value={vals.goodWith}
        name="goodWith"
        label="Interaction Profile"
        options={goodWithOpts}
        placeholder={`${pronoun} good with _______`}
        onChange={handleChange}
      />
      <Form.Dropdown
        fluid
        multiple
        selection
        value={vals.trained}
        name="trained"
        label="Training Profile"
        options={trainedOpts}
        placeholder={`${pronoun} been _______ trained`}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Field required error={formErrors.includes("description")}>
      <label>Additional Information</label>
      <TextArea
        value={vals.description}
        name="description"
        placeholder="Enter any additional info or history here"
        autoHeight
        row="4"
        onChange={handleChange}
      />
    </Form.Field>
    <Form.Group className="create-listing-checks">
      <Form.Checkbox
        name="vaccinated"
        checked={vals.vaccinated}
        label="Is Vaccinated?"
        onChange={handleChange}
      />
      <Form.Checkbox
        name="spayed"
        checked={vals.spayed}
        label="Is Spayed?"
        onChange={handleChange}
      />
    </Form.Group>
    <Image.Group className="thumbnails">
      {vals.images.map(img => (
        <Segment compact inverted color="pink" key={img.path}>
          <Image src={img.thumb} alt="your pet" />
          <Label
            as="a"
            color="red"
            content="X"
            attached="top right"
            path={img.path}
            public_id={img.public_id}
            delete_token={img.token}
            onClick={handleImgDeletion}
          />
        </Segment>
      ))}
    </Image.Group>
    <Form.Field className="create-listing-btn">
      <Popup
        inverted
        header="Max 3 images (each <2MB)"
        content="Complete other fields first"
        trigger={
          <Button
            disabled={vals.images.length >= 3}
            color="purple"
            size="big"
            content="Upload Images*"
            icon="upload"
            onClick={openImgWidget}
          />
        }
      />
      <Button
        disabled={!!formErrors.length && errorStatus}
        size="big"
        color="green"
        icon="send"
        content={`${isEdit ? "Edit" : "Create"} Listing`}
        onClick={handleSubmit}
      />
    </Form.Field>
  </Fragment>
);

export default ListingFormFields;
