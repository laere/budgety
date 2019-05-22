import axios from "axios";
import history from "../../history";
import { FETCH_USER, FETCH_CHECKS } from "actions/types";

export const addCheck = userData => async dispatch => {
  const res = await axios.post("/api/checks", userData);

  dispatch({ type: FETCH_USER, payload: res.payload });

  history.push("/budgets");
};

export const fetchChecks = () => async dispatch => {
  const res = await axios.get("/api/checks");

  console.log(res);

  dispatch({ type: FETCH_CHECKS, payload: res.data });

  history.push("/checks");
};
