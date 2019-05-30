import axios from "axios";
import history from "../history";
import {
  FETCH_USER,
  FETCH_BUDGETS,
  FETCH_BUDGET,
  FETCH_TRANSACTION,
  IS_LOADING,
  GET_ERROR
} from "actions/types";

// Refactor this code. Make it less DRY and also add error handling (try/catch)

export const fetchUser = () => async dispatch => {
  dispatch(budgetsLoading());

  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBudgets = () => async dispatch => {
  dispatch(budgetsLoading());

  const res = await axios.get("/api/budgets");

  dispatch({ type: FETCH_BUDGETS, payload: res.data });
};

export const fetchBudget = budgetId => async dispatch => {
  dispatch(budgetsLoading());
  const res = await axios.get(`/api/budgets/${budgetId}`);

  dispatch({ type: FETCH_BUDGET, payload: res.data });
};

export const addBudget = formValues => async dispatch => {
  await axios.post("/api/budgets", formValues);

  history.push("/budgets");
};

export const deleteBudget = budgetId => async dispatch => {
  dispatch(budgetsLoading());

  await axios.delete(`/api/budgets/${budgetId}`);

  // dispatch({ type: FETCH_BUDGET, payload: budgetId });

  history.push("/budgets");
};

export const editBudget = (budgetId, formValues) => async dispatch => {
  try {
    await axios.put(`/api/budgets/${budgetId}`, formValues);

    history.push("/budgets");
  } catch (error) {
    dispatch({ type: GET_ERROR, payload: error });
  }
};

/////// TRANSACTIONS ///////////////////////////////////////////////////////////////

export const getTransaction = (budgetId, transactionId) => async dispatch => {
  const res = await axios.get(`/api/budgets/${budgetId}/${transactionId}`);

  dispatch({ type: FETCH_TRANSACTION, payload: res.data });
};

export const addTransaction = (budgetId, formValues) => async dispatch => {
  const res = await axios.post(`/api/budgets/${budgetId}`, formValues);

  console.log(res.data);

  dispatch({ type: FETCH_BUDGET, payload: res.data });

  history.push(`/budgets/${budgetId}`);
};

export const deleteTransaction = (
  budgetId,
  transactionId
) => async dispatch => {
  await axios.delete(`/api/budgets/${budgetId}/${transactionId}`);

  history.push(`/budgets/${budgetId}`);
};

export const editTransaction = (
  budgetId,
  transactionId,
  formValues
) => async dispatch => {
  const res = await axios.put(
    `/api/budgets/${budgetId}/${transactionId}`,
    formValues
  );

  dispatch({ type: FETCH_BUDGET, payload: res.data });
  history.push(`/budgets/${budgetId}`);
};

export const budgetsLoading = () => {
  return {
    type: IS_LOADING
  };
};
