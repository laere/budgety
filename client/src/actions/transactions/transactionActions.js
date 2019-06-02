import axios from "axios";
import apiCall from "actions/apiCall";
import thunkCreator from "actions/thunkCreator";
import { ON_FAILURE, ON_SUCCESS } from "actions/types";

export const addTransaction = (budgetId, formValues) =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}`, axios.post, formValues),
    redirect: `/budgets/${budgetId}`
  });

export const deleteTransaction = (budgetId, transactionId) =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}/${transactionId}`, axios.delete),
    redirect: `/budgets/${budgetId}`
  });

export const editTransaction = (budgetId, transactionId, formValues) =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/${transactionId}`,
      axios.put,
      formValues
    ),
    redirect: `/budgets/${budgetId}`
  });
