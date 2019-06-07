import {
  FETCH_BUDGETS,
  FETCH_BUDGET,
  IS_LOADING,
  DELETE_CATEGORY,
  EDIT_CATEGORY
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
          categories: filteredCategories
        }
      };

    case EDIT_CATEGORY:
      const category = categories.find(
        category => category._id === action.payload._id
      );

      const updatedCategories = category
        ? [...categories, { ...category, ...action.payload }]
        : [...categories];

      return {
        ...state,
        budget: {
          categories: updatedCategories
        }
      };
    default:
      return state;
  }
};
