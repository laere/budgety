import { FETCH_USER } from "actions/types";

// const intialState = {
//   isAuthenticated: false,
//   user:
// }

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
