import React from "react";
import { Pagination, Segment } from "semantic-ui-react";
import "./ListingsPagination.css";

export default ({ activePage, totalPages, handleChange }) => (
  <Segment inverted color="pink" className="pagination-holder">
    <Pagination
      activePage={activePage}
      totalPages={totalPages}
      boundaryRange={0}
      siblingRange={1}
      ellipsisItem={null}
      prevItem={null}
      nextItem={null}
      onPageChange={handleChange}
    />
  </Segment>
);
