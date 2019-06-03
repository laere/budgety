import axios from "axios";
import apiCall from "actions/apiCall";
import thunkCreator from "actions/thunkCreator";
import history from "../../history";
import {
  FETCH_BUDGETS,
  FETCH_BUDGET,
  ON_FAILURE,
  ON_SUCCESS
} from "actions/types";

export const fetchBudgets = () =>
  thunkCreator({
    types: [FETCH_BUDGETS, ON_FAILURE],
    promise: apiCall("/api/budgets", axios.get)
  });

export const fetchBudget = budgetId =>
  thunkCreator({
    types: [FETCH_BUDGET, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}`, axios.get)
  });

export const addBudget = formValues =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall("/api/budgets", axios.post, formValues),
    redirect: "/budgets"
  });

export const deleteBudget = budgetId =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}`, axios.delete),
    redirect: "/budgets"
  });

export const editBudget = (budgetId, formValues) =>
  thunkCreator({
    types: [ON_SUCCESS, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}`, axios.put, formValues),
    redirect: `/budgets/${budgetId}`
  });
