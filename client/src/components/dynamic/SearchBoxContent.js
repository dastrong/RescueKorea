import React, { Component } from "react";
import { Transition, Form, Button, Icon } from "semantic-ui-react";

const numOfBoxes = 4;

class SearchBoxContent extends Component {
  state = {
    items: this.props.values.slice(0, numOfBoxes),
    extraCount: this.props.values.length - numOfBoxes,
  };

  componentDidUpdate(prevProps) {
    const { checkedVal, values, checkedObjUpdated } = this.props;
    const before = prevProps.checkedObjUpdated;
    const after = checkedObjUpdated;
    if (before === after) return;
    const items = values.slice(0, checkedVal ? 1 : numOfBoxes);
    this.setState({
      items,
      extraCount: values.length - numOfBoxes,
    });
  }

  handleClick = bool => () => {
    const { values } = this.props;
    this.setState({
      items: values.slice(0, values.length - (bool ? this.state.extraCount : 0)),
    });
  };

  render() {
    const { items, extraCount } = this.state;
    const { values, label, searchChange, checkedVal } = this.props;
    const isMore = values.length > items.length;
    return (
      <Transition.Group animation="swing down">
        {this.state.items.map(([value, count]) => (
          <Form.Checkbox
            key={value}
            color="violet"
            name={label}
            value={value}
            checked={checkedVal === value}
            label={`${value} (${count})`}
            onChange={searchChange}
          />
        ))}
        {!checkedVal && this.props.values.length > 4 && (
          <Button
            as="a"
            color="pink"
            className="show-more-btn"
            onClick={this.handleClick(!isMore)}
          >
            {`Show ${extraCount} ${isMore ? "More" : "Less"}`}
            <Icon name={`chevron ${isMore ? "down" : "up"}`} color="violet" />
          </Button>
        )}
      </Transition.Group>
    );
  }
}

export default SearchBoxContent;
