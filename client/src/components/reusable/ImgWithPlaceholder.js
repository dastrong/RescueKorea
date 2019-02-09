import React, { Component, Fragment } from "react";
import { Image, Placeholder } from "semantic-ui-react";
import "./ImgWithPlaceholder.css";

// reusable Image component
// accepts src and alt as props
// shows a loading placeholder until image is completely loaded

class ImgWithPlaceHolder extends Component {
  state = { isLoading: true };

  handleLoading = () => this.setState({ isLoading: false });

  render() {
    const { isLoading } = this.state;
    return (
      <Fragment>
        <Image {...this.props} hidden={isLoading} onLoad={this.handleLoading} />
        {isLoading && (
          <Placeholder style={{ maxWidth: "100%" }}>
            <Placeholder.Image rectangular />
          </Placeholder>
        )}
      </Fragment>
    );
  }
}

export default ImgWithPlaceHolder;
