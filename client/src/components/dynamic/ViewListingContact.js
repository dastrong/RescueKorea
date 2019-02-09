import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Grid, Segment, Header, Label, Confirm } from "semantic-ui-react";

class ViewListingAction extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const {
      contactName,
      contactEmail,
      adoptionFee,
      isOwner,
      postId,
      petName,
      handleDelete,
      mainImg,
    } = this.props;
    return (
      <Grid.Column style={{ paddingTop: "14px" }} width={16}>
        {isOwner && (
          <Confirm
            open={this.state.open}
            cancelButton="Nope, I changed my mind."
            confirmButton="Yes, delete."
            onCancel={this.close}
            onConfirm={handleDelete}
          />
        )}
        <Segment inverted color="pink" className="listing-story">
          <Header as="h2" color="violet" content="Interested?" />
          <Grid stackable columns={16} className="listing-contact">
            <Grid.Row columns={16}>
              <Grid.Column mobile={16} tablet={8} computer={8} className="contact-info">
                <Header as="h4">
                  <Icon name="user" color="violet" />
                  <Header.Content>
                    Contact Name:
                    <Header.Subheader content={contactName} />
                  </Header.Content>
                </Header>
                <Header as="h4">
                  <Icon name="mail" color="violet" />
                  <Header.Content>
                    Contact Email:
                    <Header.Subheader content={contactEmail} />
                  </Header.Content>
                </Header>
                <Header as="h4">
                  <Icon name="won sign" color="violet" />
                  <Header.Content>
                    Adoption Fee:
                    <Header.Subheader
                      content={
                        adoptionFee ? `${adoptionFee.toLocaleString()}` : "No Charge!"
                      }
                    />
                  </Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column
                mobile={16}
                tablet={8}
                computer={8}
                className="listing-actions"
              >
                {isOwner ? (
                  <Button.Group size="huge" widths="2">
                    <Button
                      animated="fade"
                      color="blue"
                      as={Link}
                      to={`/listing/${postId}/edit`}
                    >
                      <Button.Content visible>
                        <Icon name="edit" />
                      </Button.Content>
                      <Button.Content hidden>Edit</Button.Content>
                    </Button>
                    <Button animated="fade" color="red" onClick={this.open}>
                      <Button.Content visible>
                        <Icon name="trash alternate" />
                      </Button.Content>
                      <Button.Content hidden>Delete</Button.Content>
                    </Button>
                  </Button.Group>
                ) : (
                  <Button
                    size="huge"
                    color="purple"
                    href={`mailto:${contactEmail}?subject=I'm interested in ${petName}!`}
                  >
                    I'm interested!
                  </Button>
                )}
                <div className="share-container">
                  <Label
                    icon="share"
                    color="purple"
                    pointing="below"
                    className="socialMediaShare"
                    content="Share"
                  />
                  <Button.Group>
                    {getSocialShareBtns(window.location.href, mainImg).map(social => (
                      <Button
                        as="a"
                        circular
                        {...social}
                        target="_newtab"
                        className="socialMediaButton"
                      />
                    ))}
                  </Button.Group>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    );
  }
}

const getSocialShareBtns = (href, img) => {
  return [
    {
      icon: "facebook",
      color: "facebook",
      key: "facebook",
      href: `https://www.facebook.com/dialog/share?app_id=${
        process.env.REACT_APP_FACEBOOK_APP_ID
      }&display=popup&href=${href}`,
    },
    {
      icon: "twitter",
      color: "twitter",
      key: "twitter",
      href: `https://twitter.com/intent/tweet?&url=${href}`,
    },
    {
      icon: "pinterest",
      color: "red",
      key: "pinterest",
      href: `http://pinterest.com/pin/create/link/?url=${href}&media=${
        img ? img.url : ""
      }`,
    },
    {
      icon: "mail",
      color: "yellow",
      key: "mail",
      href: `mailto:?Subject=Check out this animal - Rescue Korea&body=${href}`,
    },
  ];
};

export default ViewListingAction;
