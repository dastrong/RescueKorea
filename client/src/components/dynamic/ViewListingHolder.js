import React, { Component } from "react";
import BlurredLoader from "../reusable/BlurredLoader";
import ImageShowCase from "../reusable/ImageShowCase";
import ViewListingPage from "../dynamic/ViewListingPage";
import { fetcher } from "../../helpers";
import { addGooEvent } from "../../helpers/analytics";

const emptyPetInfo = {
  owner: {
    id: "",
    name: "",
    email: "",
  },
  goodWith: [],
  trained: [],
  images: [],
  _id: "",
  petName: "",
  type: "",
  breed: "",
  gender: "",
  size: "",
  color: "",
  description: "",
  location: "",
  adoptionFee: 0,
  spayed: false,
  vaccinated: true,
  age: "",
  createdAt: "",
};

class ViewListingHolder extends Component {
  state = {
    isLoading: true,
    petInfo: emptyPetInfo,
    showImageShowCase: false,
    imgID: null,
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) === JSON.stringify(this.props)) return;
    // if you can't find a post redirect to error page
    if (this.props.post.length) {
      this.setState({ petInfo: this.props.post[0], isLoading: false });
    } else {
      this.props.history.push("/error");
    }
  }

  componentDidMount() {
    if (this.props.post.length) {
      this.setState({ petInfo: this.props.post[0], isLoading: false });
    }
  }

  closeImageShowCase = () => this.setState({ showImageShowCase: false });

  openImageShowCase = e => {
    addGooEvent("Listing", "Showcase opened");
    this.setState({
      showImageShowCase: true,
      imgID: Number(e.target.id),
    });
  };

  handleDelete = async () => {
    try {
      const resp = await fetcher(`/posts/${this.state.petInfo._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      });
      const post = await resp.json();
      if (!resp.ok) throw post;
      addGooEvent("Listing", "Deleted");
      this.props.updatePosts();
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
      this.props.history.push("/error");
    }
  };

  render() {
    const { petInfo, isLoading, showImageShowCase, imgID } = this.state;
    return (
      <div className="listing-container">
        <BlurredLoader isLoading={isLoading}>
          <ViewListingPage
            user={this.props.user}
            petInfo={petInfo}
            openImageShowCase={this.openImageShowCase}
            handleDelete={this.handleDelete}
          />
          {!isLoading && this.state.imgID !== null && (
            <ImageShowCase
              images={petInfo.images}
              isOpen={showImageShowCase}
              imgID={imgID}
              closeImageShowCase={this.closeImageShowCase}
            />
          )}
        </BlurredLoader>
      </div>
    );
  }
}

export default ViewListingHolder;
