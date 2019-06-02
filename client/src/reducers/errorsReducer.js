import { ON_FAILURE, ON_SUCCESS, RESET_MESSAGES } from "actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ON_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case ON_FAILURE:
      return {
        ...state,
        failure: action.payload
      };
    case RESET_MESSAGES:
      return {};
    default:
      return state;
  }
};
