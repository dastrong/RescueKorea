import React, { useState } from "react";
import { Transition, Form, Button, Icon } from "semantic-ui-react";

const numOfBoxes = 4;

export default function SearchBoxContent({ values, label, searchChange, checkedVal }) {
  const [showAll, setShowAll] = useState(false);

  const extraCount = values.length - numOfBoxes;
  const isMore = values.length > numOfBoxes;
  const items = values.slice(0, showAll ? values.length : numOfBoxes);
  return (
    <Transition.Group animation="swing down">
      {items.map(([value, count]) => (
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
      {!checkedVal && isMore && (
        <Button
          as="a"
          color="pink"
          className="show-more-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {`Show ${extraCount} ${!showAll ? "More" : "Less"}`}
          <Icon name={`chevron ${!showAll ? "down" : "up"}`} color="violet" />
        </Button>
      )}
    </Transition.Group>
  );
}
