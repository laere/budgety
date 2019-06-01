import {
  FETCH_BUDGETS,
  FETCH_BUDGET,
  IS_LOADING,
  FETCH_TRANSACTION,
  ON_SUCESS,
  RESET_ON_SUCESS_MESSAGE
} from "actions/types";

const initialState = {
  budgetList: [],
  budget: {},
  transaction: {},
  loading: false,
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_BUDGETS:
      return {
        ...state,
        budgetList: action.payload,
        loading: false
      };
    case FETCH_BUDGET:
      return {
        ...state,
        budget: action.payload,
        loading: false
      };
    case FETCH_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
        loading: false
      };
    case ON_SUCESS: {
      return {
        ...state,
        message: action.payload
      };
    }
    case RESET_ON_SUCESS_MESSAGE: {
      return {
        ...state,
        message: ""
      };
    }
    default:
      return state;
  }
};
