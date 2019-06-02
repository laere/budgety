import axios from "axios";
import apiCall from "actions/apiCall";
import thunkCreator from "actions/thunkCreator";
import { ON_SUCCESS, ON_FAILURE } from "actions/types";

export const addCheck = (budgetId, formValues) =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}/checks`, axios.post, formValues),
    redirect: `/budgets/${budgetId}`
  });

export const deleteCheck = (budgetId, checkId) =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/checks/${checkId}`,
      axios.delete
    ),
    redirect: `/budgets/${budgetId}`
  });

export const editCheck = (budgetId, checkId, formValues) =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/checks/${checkId}`,
      axios.put,
      formValues
    ),
    redirect: `/budgets/${budgetId}`
  });
