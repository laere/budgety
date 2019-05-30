import axios from "axios";
import history from "../../history";
import { FETCH_BUDGET } from "actions/types";

export const addCheck = (budgetId, userData) => async dispatch => {
  const res = await axios.post(`/api/budgets/${budgetId}/checks`, userData);

  console.log(res.data);

  dispatch({ type: FETCH_BUDGET, payload: res.data });

  history.push(`/budgets/${budgetId}`);
};

export const deleteCheck = (budgetId, checkId) => async dispatch => {
  const res = await axios.delete(`/api/budgets/${budgetId}/checks/${checkId}`);

  dispatch({ type: FETCH_BUDGET, payload: res.data });

  history.push(`/budgets/${budgetId}`);
};

export const editCheck = (budgetId, checkId, userData) => async dispatch => {
  const res = await axios.put(
    `/api/budgets/${budgetId}/checks/${checkId}`,
    userData
  );

  dispatch({ type: FETCH_BUDGET, payload: res.data });

  history.push(`/budgets/${budgetId}`);
};
