import {
  FETCH_BUDGETS,
  FETCH_BUDGET,
  IS_LOADING,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  ADD_CATEGORY_ITEM,
  DELETE_CATEGORY_ITEM
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

    case ADD_CATEGORY_ITEM:
      console.log("ADD ITEM", action.payload);
      // const matchedCategory = categories.indexOf(action.payload.category);
      // console.log(matchedCategory);
      const matchedCategories = categories.map(category => {
        console.log("Category", category);
        if (category._id === action.payload._id) {
          console.log("action payload", action.payload);
          return Object.assign({}, category, { ...action.payload });
        }
        return category;
      });

      return {
        ...state,
        budget: {
          ...state.budget,
          categories: matchedCategories
        }
      };
    case DELETE_CATEGORY_ITEM:
      console.log("ADD ITEM", action.payload);
      // const matchedCategory = categories.indexOf(action.payload.category);
      // console.log(matchedCategory);
      const matched = categories.map(category => {
        console.log("Category", category);
        if (category._id === action.payload.category._id) {
          console.log("action payload", action.payload);
          return Object.assign({}, category, { ...action.payload.category });
        }
        return category;
      });

      return {
        ...state,
        budget: {
          ...state.budget,
          amount: action.payload.budget.amount,
          categories: matched
        }
      };

    case UPDATE_CATEGORY:
      // console.log("CATEGORY FOUND IN REDUCER", category);
      // console.log("PAYLOAD", action.payload);

      // Could possibly use a hash table to reduce time complexity?

      let updatedCategory = action.payload.category;
      console.log(updatedCategory);
      console.log("categories", categories);
      const updatedCategories = categories.map(category => {
        console.log("Category", category);
        if (category._id === updatedCategory._id) {
          console.log("action payload", action.payload);
          return Object.assign({}, category, { ...updatedCategory });
        }
        return category;
      });

      return {
        ...state,
        budget: {
          ...state.budget,
          amount: action.payload.budget.amount,
          categories: updatedCategories
        }
      };

    default:
      return state;
  }
};
