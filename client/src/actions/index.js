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

const thunkCreator = action => {
  const { types, promise, redirect, ...rest } = action;
  const [FETCH, ERROR] = types;

  return async dispatch => {
    try {
      dispatch(budgetsLoading());
      const res = await promise;

      const { data } = res;

      dispatch({ ...rest, type: FETCH, payload: data });

      history.push(redirect);
    } catch (err) {
      dispatch({ ...rest, type: ERROR, payload: err });
    }
  };
};

const apiCall = (path, method, options) => {
  return method(path, options);
};

export const fetchUser = () =>
  thunkCreator({
    types: [FETCH_USER, GET_ERROR],
    promise: apiCall("/api/current_user", axios.get)
  });

export const fetchBudgets = () =>
  thunkCreator({
    types: [FETCH_BUDGETS, GET_ERROR],
    promise: apiCall("/api/budgets", axios.get)
  });

export const fetchBudget = budgetId =>
  thunkCreator({
    types: [FETCH_BUDGET, GET_ERROR],
    promise: apiCall(`/api/budgets/${budgetId}`, axios.get)
  });

export const addBudget = formValues =>
  thunkCreator({
    types: [GET_ERROR],
    promise: apiCall("/api/budgets", axios.post, formValues),
    redirect: "/budgets"
  });

// export const addBudget = formValues => async dispatch => {
//   await axios.post("/api/budgets", formValues);
//
//   history.push("/budgets");
// };

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
