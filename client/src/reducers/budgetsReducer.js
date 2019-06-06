import {
  FETCH_BUDGETS,
  FETCH_BUDGET,
  IS_LOADING,
  DELETE_CATEGORY
} from "actions/types";

const initialState = {
  budgetList: [],
  budget: {},
  loading: false
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

    case DELETE_CATEGORY:
      const categories = state.budget.categories;
      const filteredCategories = categories.filter(
        item => item._id !== action.payload._id
      );

      return {
        ...state,
        budget: {
          categories: filteredCategories
        }
      };

    default:
      return state;
  }
};
