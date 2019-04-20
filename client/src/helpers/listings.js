const labels = ["location", "gender", "breed", "color"];

// returns an array of objects with a label string and value array
// value array is separated by the
export function createSearchBoxes(listings) {
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

export function stripListings(listings) {
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
