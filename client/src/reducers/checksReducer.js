import { FETCH_CHECKS } from "actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_CHECKS:
      return action.payload;
    default:
      return state;
  }
};
