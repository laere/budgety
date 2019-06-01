import axios from "axios";
import apiCall from "actions/apiCall";
import thunkCreator from "actions/thunkCreator";
import history from "../history";
import {
  FETCH_USER,
  FETCH_BUDGETS,
  FETCH_BUDGET,
  FETCH_TRANSACTION,
  IS_LOADING,
  ON_FAILURE
} from "actions/types";

export const fetchUser = () =>
  thunkCreator({
    types: [FETCH_USER, ON_FAILURE],
    promise: apiCall("/api/current_user", axios.get)
  });

export const budgetsLoading = () => {
  return {
    type: IS_LOADING
  };
};
