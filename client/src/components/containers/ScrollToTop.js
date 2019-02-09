import React, { Component } from "react";
import { throttle } from "lodash";
import { Icon } from "semantic-ui-react";
import "./ScrollToTop.css";

class ScrollToTop extends Component {
  state = { isVisible: false };

  componentDidMount() {
    document.addEventListener("scroll", throttle(this.handleScroll, 1000));
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (!window.scrollY) return this.setState({ isVisible: false });
    if (this.state.isVisible) return;
    this.setState({ isVisible: true });
  };

  handleClick = () => window.scrollTo(0, 0);

  render() {
    return (
      this.state.isVisible && (
        <Icon
          name="angle double up"
          color="olive"
          onClick={this.handleClick}
          className="scroll-to-top"
        />
      )
    );
  }
}

export default ScrollToTop;
