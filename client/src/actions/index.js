import axios from "axios";
import history from "../history";
import {
  FETCH_USER,
  FETCH_BUDGETS,
  FETCH_BUDGET,
  DELETE_BUDGET,
  FETCH_TRANSACTION,
  IS_LOADING
} from "actions/types";

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
  const res = await axios.post("/api/budgets", formValues);

  dispatch({ type: FETCH_USER, payload: res.data });
  history.push("/budgets");
};

export const deleteBudget = budgetId => async dispatch => {
  const res = await axios.delete(`/api/budgets/delete/${budgetId}`);

  dispatch({ type: DELETE_BUDGET, payload: budgetId });
  history.push("/budgets");
};

export const editBudget = (budgetId, formValues) => async dispatch => {
  const res = await axios.patch(`/api/budgets/edit/${budgetId}`, formValues);

  dispatch({ type: FETCH_BUDGETS, payload: res.data });
  history.push("/budgets");
};

/////// TRANSACTIONS ///////////////////////////////////////////////////////////////

export const getTransaction = (budgetId, transactionId) => async dispatch => {
  const res = await axios.get(
    `/api/budgets/${budgetId}/transactions/${transactionId}`
  );

  dispatch({ type: FETCH_TRANSACTION, payload: res.data });
};

export const addTransaction = (budgetId, formValues) => async dispatch => {
  const res = await axios.post(
    `/api/budgets/${budgetId}/transactions`,
    formValues
  );

  dispatch({ type: FETCH_BUDGET, payload: res.data });
  history.push(`/budgets/${budgetId}`);
};

export const deleteTransaction = (
  budgetId,
  transactionId
) => async dispatch => {
  const res = await axios.delete(
    `/api/budgets/${budgetId}/transactions/${transactionId}`
  );

  dispatch({ type: FETCH_BUDGET, payload: res.data });
  history.push(`/budgets/${budgetId}`);
};

export const editTransaction = (
  transactionId,
  budgetId,
  formValues
) => async dispatch => {
  const res = await axios.patch(
    `/api/budgets/${budgetId}/transactions/${transactionId}`,
    formValues
  );

  dispatch({ type: FETCH_TRANSACTION, payload: res.data });
  history.push(`/budgets/${budgetId}`);
};

export const budgetsLoading = () => {
  return {
    type: IS_LOADING
  };
};
