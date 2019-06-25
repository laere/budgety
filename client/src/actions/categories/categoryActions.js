import axios from "axios";
import apiCall from "actions/apiCall";
import thunkCreator from "actions/thunkCreator";

import {
  FETCH_BUDGET,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  ON_FAILURE,
  ADD_CATEGORY_ITEM,
  DELETE_CATEGORY_ITEM,
  UPDATE_CATEGORY_ITEM
} from "actions/types";

export const addCategory = budgetId =>
  thunkCreator({
    types: [FETCH_BUDGET, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}/categories`, axios.post)
  });

export const deleteCategory = (budgetId, categoryId) =>
  thunkCreator({
    types: [DELETE_CATEGORY, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/categories/${categoryId}`,
      axios.delete
    )
  });

export const updateCategory = (budgetId, categoryId, formValues) =>
  thunkCreator({
    types: [UPDATE_CATEGORY, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/categories/${categoryId}`,
      axios.put,
      formValues
    ),
    redirect: `/budgets/${budgetId}`
  });

export const addCategoryItem = (budgetId, categoryId) =>
  thunkCreator({
    types: [UPDATE_CATEGORY, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/categories/${categoryId}`,
      axios.post
    )
  });

export const deleteCategoryItem = (budgetId, categoryId, categoryItemId) =>
  thunkCreator({
    types: [UPDATE_CATEGORY_ITEM, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/categories/${categoryId}/${categoryItemId}`,
      axios.delete
    )
  });

export const updateCategoryItem = (
  budgetId,
  categoryId,
  categoryItemId,
  formValues
) =>
  thunkCreator({
    types: [UPDATE_CATEGORY_ITEM, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/categories/${categoryId}/${categoryItemId}`,
      axios.put,
      formValues
    ),
    redirect: `/budgets/${budgetId}`
  });
