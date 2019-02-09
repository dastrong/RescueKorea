import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CardList from "../reusable/CardList";
import EmptyPlaceholder from "../reusable/EmptyPlaceholder";
import "./FeaturedPosts.css";

class FeaturedPosts extends Component {
  state = {
    posts: [],
    isLoading: true,
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) === JSON.stringify(this.props)) return;
    this.setState({ posts: this.props.posts, isLoading: false });
  }

  componentDidMount() {
    const { posts } = this.props;
    if (posts.length) {
      this.setState({ posts, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { posts, isLoading } = this.state;
    return (
      <div className="featured-container">
        {!posts.length ? (
          <EmptyPlaceholder />
        ) : (
          <CardList
            pets={posts}
            isLoading={isLoading}
            mobile={16}
            tablet={8}
            computer={4}
          />
        )}
        {this.props.totalPostsLength > 4 && (
          <Button
            as={Link}
            to="/listings"
            size="big"
            color="purple"
            content="View More Listings"
          />
        )}
      </div>
    );
  }
}

export default FeaturedPosts;
