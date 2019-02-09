import React, { Component } from "react";
import { Header, Icon, Segment, Form, Accordion, Button } from "semantic-ui-react";
import SearchBoxContent from "./SearchBoxContent";
import "./SearchBox.css";

class SearchBox extends Component {
  state = {
    isOpen: window.innerWidth > 767,
    isDisabled: window.innerWidth > 767,
  };

  handleClick = () => {
    if (this.state.isOpen) {
      document.querySelector(".pushable").scrollIntoView(true);
    } else {
      document.getElementById("search-container").scrollIntoView(true);
    }
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {
      areBoxesEmpty,
      searchParams,
      checkedObj,
      searchChange,
      searchClear,
    } = this.props;
    const { isOpen, isDisabled } = this.state;
    const checkedObjUpdated = JSON.stringify(checkedObj);
    return (
      <Segment inverted color="pink" id="search-container">
        <Accordion>
          <Accordion.Title onClick={!isDisabled ? this.handleClick : null}>
            <Header
              dividing
              as="h1"
              color="violet"
              content="Filters"
              textAlign="center"
            />
          </Accordion.Title>
          <Accordion.Content active={isOpen}>
            <Form loading={!searchParams[0].values.length}>
              {searchParams.map(({ label, values }) => (
                <Form.Group grouped key={label}>
                  <Header as="h3" color="violet" content={label} />
                  {values.length && (
                    <SearchBoxContent
                      values={values}
                      label={label}
                      searchChange={searchChange}
                      checkedObjUpdated={checkedObjUpdated}
                      checkedVal={checkedObj[label]}
                    />
                  )}
                </Form.Group>
              ))}
              <Button
                size="big"
                color="purple"
                content="Clear"
                disabled={areBoxesEmpty}
                onClick={searchClear}
              />
            </Form>
          </Accordion.Content>
          {!isDisabled && (
            <Icon
              onClick={!isDisabled ? this.handleClick : null}
              name={`chevron ${isOpen ? "up" : "down"}`}
              size="huge"
              color="violet"
            />
          )}
        </Accordion>
      </Segment>
    );
  }
}

export default SearchBox;
