import { GET_ERROR } from "actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
