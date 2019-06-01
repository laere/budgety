import { ON_FAILURE } from "actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case ON_FAILURE:
      return action.payload;
    default:
      return state;
  }
};
