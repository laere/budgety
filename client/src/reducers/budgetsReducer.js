import {
  FETCH_BUDGETS,
  FETCH_BUDGET,
  IS_LOADING,
  DELETE_CATEGORY,
  UPDATE_CATEGORY
} from "actions/types";

const initialState = {
  budgetList: [],
  budget: {},
  loading: false
};

export default (state = initialState, action) => {
  const { categories } = state.budget;
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
      const filteredCategories = categories.filter(
        item => item._id !== action.payload._id
      );

      return {
        ...state,
        budget: {
          ...state.budget,
          categories: filteredCategories
        }
      };

    case UPDATE_CATEGORY:
      // console.log("CATEGORY FOUND IN REDUCER", category);
      // console.log("PAYLOAD", action.payload);

      // Could possibly use a hash table to reduce time complexity?
      const updatedCategories = categories.map(category => {
        if (category._id === action.payload._id) {
          return Object.assign({}, category, { ...action.payload });
        }
        return category;
      });
      // console.log("CATEGORIES", categories);
      // console.log("UPDATED CATEGORIES", updatedCategories);

      return {
        ...state,
        budget: {
          ...state.budget,
          categories: updatedCategories
        }
      };

    default:
      return state;
  }
};
