import React, { useState, useLayoutEffect } from "react";
import { Header, Icon, Segment, Form, Accordion, Button } from "semantic-ui-react";
import SearchBoxContent from "./ListingsFilterBoxContent";
import useScreenSize from "../../hooks/useScreenSize";
import "./ListingsFilterBox.css";

export default function ListingsFilterBox({
  areBoxesEmpty,
  searchParams,
  checkedObj,
  searchChange,
  searchClear,
  isLoading,
}) {
  const isMobile = useScreenSize();
  const [isOpen, toggle] = useState(isMobile);

  // using layout to prevent that extra render hitch
  useLayoutEffect(() => {
    // isOpen should always be the opposite of isMobile
    if (isMobile !== isOpen) return;
    toggle(!isOpen);
  }, [isMobile]);

  function handleClick() {
    if (!isMobile) return;
    window.scrollTo({ top: isOpen ? 0 : 90, behavior: "smooth" });
    toggle(!isOpen);
  }

  return (
    <Segment loading={isLoading} inverted color="pink" id="search-container">
      <Accordion>
        <Accordion.Title onClick={handleClick} style={{ textAlign: "center" }}>
          <Icon color="violet" size="big" name="filter" fitted />
        </Accordion.Title>
        <Accordion.Content active={isOpen}>
          <Form>
            {searchParams.map(({ label, values }) => (
              <Form.Group grouped key={label}>
                <Header as="h3" color="violet" content={label} />
                {values.length && (
                  <SearchBoxContent
                    values={values}
                    label={label}
                    searchChange={searchChange}
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
        {isMobile && isOpen && (
          <Icon onClick={handleClick} name="chevron up" size="huge" color="violet" />
        )}
      </Accordion>
    </Segment>
  );
}
