import axios from "axios";
import apiCall from "actions/apiCall";
import thunkCreator from "actions/thunkCreator";
import history from "../../history";
import {
  FETCH_USER,
  FETCH_BUDGETS,
  FETCH_BUDGET,
  FETCH_TRANSACTION,
  IS_LOADING,
  ON_FAILURE,
  ON_SUCESS,
  RESET_ON_SUCESS_MESSAGE
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
    types: [ON_SUCESS, ON_FAILURE],
    promise: apiCall("/api/budgets", axios.post, formValues),
    redirect: "/budgets"
  });

export const deleteBudget = budgetId =>
  thunkCreator({
    types: [ON_SUCESS, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}`, axios.delete),
    redirect: "/budgets"
  });

export const resetOnSuccessMessage = () => {
  return {
    type: RESET_ON_SUCESS_MESSAGE
  };
};
// export const deleteBudget = budgetId => async dispatch => {
//   await axios.delete(`/api/budgets/${budgetId}`);
//
//   // dispatch({ type: FETCH_BUDGET, payload: budgetId });
//
//   history.push("/budgets");
// };

export const editBudget = (budgetId, formValues) => async dispatch => {
  try {
    await axios.put(`/api/budgets/${budgetId}`, formValues);

    history.push("/budgets");
  } catch (error) {
    dispatch({ type: ON_FAILURE, payload: error });
  }
};
