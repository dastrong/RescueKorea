import {} from "../actionTypes";

const initialState = {
  isAuthenticated: null,
  email: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
