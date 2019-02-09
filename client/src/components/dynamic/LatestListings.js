import React, { Component } from "react";
import CardList from "../reusable/CardList";
import SearchBox from "../dynamic/SearchBox";
import { Grid, Container, Pagination, Segment } from "semantic-ui-react";
import "./LatestListings.css";
import EmptyPlaceholder from "../reusable/EmptyPlaceholder";

// used to map through object
const labels = ["location", "gender", "breed", "color"];

// stringifying to eliminate obj references
// use JSON.parse(fields)
const fields = JSON.stringify({
  location: {},
  gender: {},
  breed: {},
  color: {},
});

// holds our checked box values
const checkedObj = {
  location: "",
  gender: "",
  breed: "",
  color: "",
};

class LatestListings extends Component {
  state = {
    allPets: [],
    filteredPets: [],
    checkedObj,
    searchFields: JSON.parse(fields),
    perPage: 6,
    isLoading: true,
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.posts) === JSON.stringify(this.props.posts)) return;
    this.setState({ allPets: this.props.posts, isLoading: false }, this.handleLogic);
  }

  componentDidMount() {
    const { posts } = this.props;
    if (posts.length) {
      this.setState({ allPets: this.props.posts, isLoading: false }, this.handleLogic);
    } else {
      this.setState({ isLoading: false });
    }
  }

  handleLogic = (
    filteredPets = this.state.allPets,
    checkedObj = this.state.checkedObj
  ) => {
    const searchFields = this.createSearchBoxes(filteredPets);
    this.setState({
      searchFields,
      filteredPets,
      checkedObj,
      activePage: 1,
      totalPages: Math.ceil(filteredPets.length / this.state.perPage),
    });
  };

  createSearchBoxes = petsArr =>
    petsArr.reduce((acc, cVal) => {
      labels.forEach(value => {
        acc[value][cVal[value]]
          ? (acc[value][cVal[value]] += 1)
          : (acc[value][cVal[value]] = 1);
      });
      return acc;
    }, JSON.parse(fields));

  handleBoxClick = (e, { value, name, checked }) => {
    const updater = checked ? value : "";
    const checkedObj = { ...this.state.checkedObj, [name]: updater };
    this.handleFilter(name, value, checked, checkedObj);
  };

  handleFilter = (name, value, checked, checkedObj) => {
    const { filteredPets, allPets } = this.state;
    const filteredResults = checked
      ? // user checks a box - filter the filtered results further
        filteredPets.filter(pet => pet[name] === value)
      : // user unchecks a box - check if any boxes are checked at all
      !labels.every(label => !checkedObj[label])
      ? // if there is, filter all the pets again
        allPets.filter(pet =>
          labels.every(label =>
            checkedObj[label] ? checkedObj[label] === pet[label] : true
          )
        )
      : // if there isn't, return all pets
        allPets;
    this.handleLogic(filteredResults, checkedObj);
  };

  handleClear = () => this.handleLogic(this.state.allPets, checkedObj);

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    const {
      filteredPets,
      searchFields,
      checkedObj,
      activePage,
      totalPages,
      perPage,
      isLoading,
    } = this.state;
    const searchParams = labels.map(label => ({
      label,
      values: Object.entries(searchFields[label]),
    }));
    const lastItemNum = activePage * perPage;
    const results = filteredPets.slice(lastItemNum - perPage, lastItemNum);
    const areBoxesEmpty = Object.values(checkedObj).every(x => !x.length);
    return (
      <Container>
        <Grid stackable columns={16}>
          <Grid.Column width={4}>
            <SearchBox
              areBoxesEmpty={areBoxesEmpty}
              searchParams={searchParams}
              checkedObj={checkedObj}
              searchChange={this.handleBoxClick}
              searchClear={this.handleClear}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            {!results.length ? (
              <EmptyPlaceholder />
            ) : (
              <CardList
                pets={results}
                isLoading={isLoading}
                mobile={16}
                tablet={8}
                computer={5}
              />
            )}
            {activePage && (
              <Segment inverted color="pink" className="pagination-holder">
                <Pagination
                  activePage={activePage}
                  totalPages={totalPages}
                  boundaryRange={0}
                  siblingRange={1}
                  ellipsisItem={null}
                  prevItem={null}
                  nextItem={null}
                  onPageChange={this.handlePaginationChange}
                />
              </Segment>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default LatestListings;
