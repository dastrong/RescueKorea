import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Grid, Container } from "semantic-ui-react";
import Cards from "./_reusable/Cards";
import EmptyPlaceholder from "./_static/EmptyPlaceholder";
import ListingsFilterBox from "./Listings/ListingsFilterBox";
import ListingsPagination from "./Listings/ListingsPagination";
import { createSearchBoxes, stripListings } from "../helpers/listings";
import useScreenSize from "../hooks/useScreenSize";

function Listings({ listings, isLoading }) {
  const isMobile = useScreenSize();
  const [perPage, setPerPage] = useState(isMobile ? 3 : 6);
  const [activePage, setPage] = useState(1);
  const [checkedFilters, setFilters] = useState({});
  const [filteredListings, setListings] = useState(listings);
  const [searchParams, setSearchParams] = useState(createSearchBoxes(listings));

  useEffect(() => {
    setPerPage(isMobile ? 3 : 6);
  }, [isMobile]);

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
    <>
      <Helmet>
        <title>View All Listings - Rescue Korea</title>
        <meta
          name="description"
          content="View all pet adoption listings from Rescue Korea"
        />
        <meta property="og:title" content="View All Listings - Rescue Korea" />
        <meta
          property="og:description"
          content="View all pet adoption listings on Rescue Korea"
        />
        <meta property="og:url" content="https://rescuekorea.netlify.com/listings" />
      </Helmet>

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
              <Cards showPlaceholders={true} />
            ) : !filteredListings.length ? (
              <EmptyPlaceholder />
            ) : (
              <>
                <Cards listings={currentPageListings} />
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
    </>
  );
}

const mapStateToProps = state => ({
  listings: stripListings(state.listings),
  isLoading: state.ui.isListingsLoading,
});

export default connect(mapStateToProps)(Listings);
