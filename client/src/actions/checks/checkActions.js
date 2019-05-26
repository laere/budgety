import axios from "axios";
import history from "../../history";
import { FETCH_BUDGET, FETCH_CHECKS } from "actions/types";

export const addCheck = (budgetId, userData) => async dispatch => {
  const res = await axios.post(`/api/budgets/${budgetId}/checks`, userData);

  console.log(res.data);

  dispatch({ type: FETCH_BUDGET, payload: res.data });

  history.push(`/budgets/${budgetId}`);
};

export const fetchChecks = () => async dispatch => {
  const res = await axios.get("/api/checks");

  console.log(res);

  dispatch({ type: FETCH_CHECKS, payload: res.data });

  history.push("/checks");
};
