import React, { Component } from "react";
import { Accordion, Icon, List } from "semantic-ui-react";
import StyledContainer from "../reusable/StyledContainer";
import "./ListingPolicy.css";

export default class AccordionExampleStyled extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, { index }) => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <StyledContainer topHeader="Listing Policy" btmHeader="Follow the guidelines below">
        <Accordion styled className="lp-accordion">
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Listing Guidelines
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <List as="ul" className="listing-policy-items">
              <List.Item as="li" className="listing-policy-item">
                <span className="policy-heading">ONE animal per listing.</span> If you
                have multiple animals make separate listings and add a link to your other
                listing in the description.
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                <span className="policy-heading">
                  Only type the name in the name field.
                </span>{" "}
                Please don't add things like "Urgent", "Baby", "Kitten", "Puppy" or any
                additional information in the name field. You can include these in the
                description field. Please use only English characters; do not post the
                animal’s name in Hangeul. Also, to avoid errors in your upload, please
                keep the name short (example: "David", not "David formerly Socks").
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                <span className="policy-heading">Min 1 photo; Max 3 photos.</span> Please
                try to crop your photos into a sqaure or landscape view (long) for the
                best possible experience.
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                <span className="policy-heading">
                  The animal MUST be in your possession.
                </span>{" "}
                Only list animals that you have in your possession. Please do NOT post
                about animals you’ve seen on the street if you did not take the animal in.
                Please also do not post for animals in a government pound. We know you
                want to help these animals, but the best way would be to take them in as a
                foster family or take them to a local no-kill shelter. If you are posting
                on behalf of a no-kill shelter, you must provide written authorization
                from the shelter owner that you are the designated contact for posting
                listings.
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                <span className="policy-heading">
                  Use YOUR email address and respond to ALL inquires.
                </span>{" "}
                The contact email for each listing MUST belong to the person that created
                the listing. This person should have authority to process adoption
                applications for the listed animal. The contact person must speak English.
                If you are posting on behalf of a non-English speaking acquaintance or
                facility, please be sure to follow all other guidelines. After listing an
                animal, you have agreed to answer all inquiries in a timely fashion. If
                several complaints are received regarding an unresponsive lister, the
                listing will be removed from the site and the user will be issued a
                warning. Several incidences will result in the user being blacklisted.
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                <span className="policy-heading">
                  DELETE your listing after adoption.
                </span>{" "}
                After 90 days, a listing and it's photos will automatically be deleted. If
                adoption is no longer needed, please delete the listing yourself. Keep in
                mind that unhappy adopters will lead to less visits and recommendations to
                use our site. To make sure our furry friends here have the highest chances
                of find loving homes, please use the site responsibly.
              </List.Item>
            </List>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            How to List an Animal
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <List as="ol" className="listing-policy-items">
              <List.Item as="li" className="listing-policy-item">
                Read our listing policy.
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                Create an account or log into your account.
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                Head to create a listing.
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                Fill in all required information, including at least one photo. Remember
                to follow the posting guidelines above.
              </List.Item>
              <List.Item as="li" className="listing-policy-item">
                Click 'Create a Listing'.
              </List.Item>
            </List>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            How to Edit & Delete a Listing
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <List>
              <List.Item className="listing-policy-item">
                Log into your account and go to your listing. Scroll to the bottom and
                click the edit or delete button. *Listings are automatically deleted after
                90 days of creation*
              </List.Item>
            </List>
          </Accordion.Content>
        </Accordion>
      </StyledContainer>
      // <Container>
      //   <Segment inverted color="pink" className="lp-segment">
      //   </Segment>
      // </Container>
    );
  }
}
