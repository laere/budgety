import axios from "axios";
import apiCall from "actions/apiCall";
import thunkCreator from "actions/thunkCreator";
import history from "../../history";
import {
  FETCH_BUDGET,
  FETCH_TRANSACTION,
  IS_LOADING,
  ON_FAILURE,
  ON_SUCESS
} from "actions/types";

export const getTransaction = (budgetId, transactionId) =>
  thunkCreator({
    types: [FETCH_TRANSACTION, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}/${transactionId}`, axios.get)
  });

// export const getTransaction = (budgetId, transactionId) => async dispatch => {
//   const res = await axios.get(`/api/budgets/${budgetId}/${transactionId}`);
//
//   dispatch({ type: FETCH_TRANSACTION, payload: res.data });
// };

export const addTransaction = (budgetId, formValues) =>
  thunkCreator({
    types: [ON_SUCESS, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}`, axios.post, formValues),
    redirect: `/budgets/${budgetId}`
  });

// export const addTransaction = (budgetId, formValues) => async dispatch => {
//   const res = await axios.post(`/api/budgets/${budgetId}`, formValues);
//
//   console.log(res.data);
//
//   dispatch({ type: FETCH_BUDGET, payload: res.data });
//
//   history.push(`/budgets/${budgetId}`);
// };

export const deleteTransaction = (budgetId, transactionId) =>
  thunkCreator({
    types: [ON_SUCESS, ON_FAILURE],
    promise: apiCall(`/api/budgets/${budgetId}/${transactionId}`, axios.delete),
    redirect: `/budgets/${budgetId}`
  });

// export const deleteTransaction = (
//   budgetId,
//   transactionId
// ) => async dispatch => {
//   await axios.delete(`/api/budgets/${budgetId}/${transactionId}`);
//
//   history.push(`/budgets/${budgetId}`);
// };

export const editTransaction = (budgetId, transactionId, formValues) =>
  thunkCreator({
    types: [ON_SUCESS, ON_FAILURE],
    promise: apiCall(
      `/api/budgets/${budgetId}/${transactionId}`,
      axios.put,
      formValues
    ),
    redirect: `/budgets/${budgetId}`
  });

// export const editTransaction = (
//   budgetId,
//   transactionId,
//   formValues
// ) => async dispatch => {
//   const res = await axios.put(
//     `/api/budgets/${budgetId}/${transactionId}`,
//     formValues
//   );
//
//   dispatch({ type: FETCH_BUDGET, payload: res.data });
//   history.push(`/budgets/${budgetId}`);
// };
