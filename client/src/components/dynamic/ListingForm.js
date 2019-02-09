import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import ListingFormFields from "./ListingFormFields";
import FormMessages from "../reusable/FormMessages";
import {
  cloudinaryOptions,
  checkRequiredFields,
  fetcher,
  initialFormState,
  stringifyBody,
} from "../../helpers";
import { addGooEvent } from "../../helpers/analytics";

const extraState = {
  formErrors: [],
  errorMsg: "",
  errorStatus: null,
  isProcessing: false,
};

class CreateListingForm extends Component {
  state = { ...initialFormState, ...extraState };

  componentDidMount() {
    if (!this.props.isEdit) return;
    this.setState({ ...this.props.post[0] });
  }

  // needed to go from an edit to create successfully
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) === JSON.stringify(this.props)) return;
    if (this.props.isEdit) {
      this.setState({ ...this.props.post[0] });
    } else {
      this.setState({ ...initialFormState });
    }
  }

  handleChange = (e, { name, value, checked }) =>
    this.setState({ [name]: checked ? checked : value }, this._checkFieldsAfterUpdating);

  handleCreate = async () => {
    try {
      if (!this.props.user) throw new Error("You must log in first");
      const { userId, fullName, email, token } = this.props.user;
      const owner = { id: userId, name: fullName, email };
      const body = stringifyBody(this.state, owner);
      const resp = await fetcher("/posts", {
        method: "POST",
        body,
        headers: { Authorization: `Bearer ${token}` },
      });
      const post = await resp.json();
      if (!resp.ok) throw post;
      addGooEvent("Listing", "Created");
      this.props.updatePosts();
      this.props.history.push(`/listing/${post._id}`);
    } catch (err) {
      console.log(err);
      this.setState({
        isProcessing: false,
        errorStatus: true,
        errorMsg: err.message,
      });
    }
  };

  handleUpdate = async () => {
    try {
      if (!this.props.user) throw new Error("You must log in first");
      const { token } = this.props.user;
      const body = stringifyBody(this.state, null);
      const resp = await fetcher(`/posts/${this.state._id}`, {
        method: "PUT",
        body,
        headers: { Authorization: `Bearer ${token}` },
      });
      const post = await resp.json();
      if (!resp.ok) throw post;
      addGooEvent("Listing", "Updated");
      this.props.updatePosts();
      this.props.history.push(`/listing/${post._id}`);
    } catch (err) {
      console.log(err);
      this.setState({
        isProcessing: false,
        errorStatus: true,
        errorMsg: err.message,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const errorsObj = checkRequiredFields(this.state);
    this.setState({ ...errorsObj, isProcessing: !errorsObj.errorStatus }, () => {
      if (!errorsObj.errorStatus) {
        if (this.props.isEdit) {
          this.handleUpdate();
        } else {
          this.handleCreate();
        }
      }
    });
  };

  deleteNewImages = async (e, { delete_token, path }) => {
    const start = process.env.REACT_APP_IMG_DELETE_URL;
    const end = `?token=${delete_token}`;
    const images = this.state.images.filter(img => img.path !== path);
    this.setState({ images }, () => {
      fetch(start + end, { method: "POST" });
      this._checkFieldsAfterUpdating();
    });
  };

  deleteOldImages = async (e, { public_id, path }) => {
    try {
      const urlAdd = `?public_ids=${public_id}`;
      const resp = await fetcher(`/images/single${urlAdd}`, { method: "DELETE" });
      const image = await resp.json();
      if (!resp.ok) throw image;
      const images = this.state.images.filter(img => img.path !== path);
      this.setState({ isLoading: false, images });
    } catch (err) {
      console.log(err);
      this.props.history.push("/error");
    }
  };

  openImgWidget = () => {
    const { images } = this.state;
    const { formErrors } = checkRequiredFields(this.state);
    // don't open the upload widget if...
    if (
      images.length >= 3 ||
      formErrors.length > 1 ||
      (formErrors.length === 1 && !formErrors.includes("images"))
    )
      return;
    window.cloudinary.openUploadWidget(cloudinaryOptions, (err, { event, info }) => {
      if (event !== "success") return;
      this.setState(
        {
          images: [
            ...images,
            {
              public_id: info.public_id,
              path: info.path,
              url: info.secure_url,
              thumb: info.thumbnail_url,
              token: info.delete_token,
            },
          ],
        },
        this._checkFieldsAfterUpdating
      );
    });
  };

  _checkFieldsAfterUpdating = () => {
    if (this.state.errorStatus) {
      const errorsObj = checkRequiredFields(this.state);
      return this.setState({ ...errorsObj });
    }
  };

  render() {
    const { gender, formErrors, errorStatus, errorMsg, isProcessing } = this.state;
    return (
      <Form loading={isProcessing} error={errorStatus}>
        <ListingFormFields
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleImgDeletion={
            this.props.isEdit ? this.deleteOldImages : this.deleteNewImages
          }
          openImgWidget={this.openImgWidget}
          formErrors={formErrors}
          errorStatus={errorStatus}
          isEdit={this.props.isEdit}
          pronoun={!gender ? "He/She's" : gender === "male" ? "He's" : "She's"}
        />
        <FormMessages errorMsg={errorMsg} errorStatus={errorStatus} />
      </Form>
    );
  }
}

export default CreateListingForm;
