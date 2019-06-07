import axios from "axios";
import apiCall from "actions/apiCall";
import thunkCreator from "actions/thunkCreator";

import {
  FETCH_BUDGET,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  ON_FAILURE,
  ON_SUCCESS
} from "actions/types";

export const addCategory = budgetId =>
  thunkCreator({
    types: [FETCH_BUDGET, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}/categories`, axios.post)
  });

export const addCategoryItem = (budgetId, categoryId) =>
  thunkCreator({
    types: [FETCH_BUDGET, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/categories/${categoryId}`,
      axios.post
    )
  });

export const deleteCategory = (budgetId, categoryId) =>
  thunkCreator({
    types: [DELETE_CATEGORY, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/categories/${categoryId}`,
      axios.delete
    )
  });

export const editCategory = (budgetId, categoryId, formValues) =>
  thunkCreator({
    types: [EDIT_CATEGORY, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/categories/${categoryId}`,
      axios.put,
      formValues
    ),
    redirect: `/budgets/${budgetId}`
  });
