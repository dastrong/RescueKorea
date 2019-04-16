import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Container } from "semantic-ui-react";
import CardList from "../components/reusable/CardList";
import EmptyPlaceholder from "../components/reusable/EmptyPlaceholder";
import ListingsFilterBox from "../components/dynamic/ListingsFilterBox";
import ListingsPagination from "../components/dynamic/ListingsPagination";

const perPage = 6;
const labels = ["location", "gender", "breed", "color"];
// returns an array of objects with a label string and value array
// value array is separated by the
function createSearchBoxes(listings) {
  const objSortedByLabels = listings.reduce(
    (acc, cVal) => {
      // breaks down listings according to labels array w/ count
      labels.forEach(label => {
        acc[label][cVal[label]]
          ? (acc[label][cVal[label]] += 1)
          : (acc[label][cVal[label]] = 1);
      });
      return acc;
    },
    {
      location: {},
      gender: {},
      breed: {},
      color: {},
    }
  );
  return labels.map(label => ({
    label,
    values: Object.entries(objSortedByLabels[label]),
  }));
}

function stripListings(listings) {
  return listings.map(({ _id, petName, gender, location, images, breed, color }) => ({
    _id,
    petName,
    gender,
    location,
    breed,
    color,
    image: images[0].url,
  }));
}

// defaultly exported component
function ListingsPage({ listings, isLoading }) {
  const [activePage, setPage] = useState(1);
  const [checkedFilters, setFilters] = useState({});
  const [filteredListings, setListings] = useState(listings);
  const [searchParams, setSearchParams] = useState(createSearchBoxes(listings));

  useEffect(() => {
    setListings(listings);
    setSearchParams(createSearchBoxes(listings));
  }, [listings]);

  function handleState(filters = {}, lists = listings) {
    setFilters(filters);
    setListings(lists);
    setSearchParams(createSearchBoxes(lists));
    setPage(1);
  }

  function handleBoxClick(e, { value, name, checked }) {
    // reset if user unchecks the only checked box
    if (!checked && Object.keys(checkedFilters).length === 1) return handleState();
    // add or delete the value from the checkedFilters object
    checked ? (checkedFilters[name] = value) : delete checkedFilters[name];
    // send the new filters
    const newCheckedFilters = { ...checkedFilters };
    // gets an array with the header labels of each checked box
    const checkedLabels = Object.keys(newCheckedFilters);
    const filteredListings = listings.filter(listing =>
      // returns false if either label checked doesn't match the current listing
      checkedLabels.every(label => listing[label] === newCheckedFilters[label])
    );
    handleState(newCheckedFilters, filteredListings);
  }

  const handlePageChange = (e, { activePage }) => {
    window.scrollTo(0, 0);
    setPage(activePage);
  };

  const totalPages = Math.ceil(filteredListings.length / perPage);
  const lastItemNum = activePage * perPage;
  const currentPageListings = filteredListings.slice(lastItemNum - perPage, lastItemNum);
  return (
    <Container>
      <Grid centered stackable columns={16}>
        {(isLoading || !!filteredListings.length) && (
          <Grid.Column width={4}>
            <ListingsFilterBox
              isLoading={isLoading}
              areBoxesEmpty={filteredListings.length === listings.length}
              searchParams={searchParams}
              checkedObj={checkedFilters}
              searchChange={handleBoxClick}
              searchClear={() => handleState()}
            />
          </Grid.Column>
        )}
        <Grid.Column width={12}>
          {isLoading ? (
            <CardList showPlaceholders={true} />
          ) : !filteredListings.length ? (
            <EmptyPlaceholder />
          ) : (
            <>
              <CardList listings={currentPageListings} />
              <ListingsPagination
                activePage={activePage}
                totalPages={totalPages}
                handleChange={handlePageChange}
              />
            </>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
}

const mapStateToProps = state => ({
  listings: stripListings(state.listings),
  isLoading: state.ui.isListingsLoading,
});

export default connect(mapStateToProps)(ListingsPage);
