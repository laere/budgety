import history from "../history";
import { budgetsLoading } from "actions/index.js";

const thunkCreator = action => {
  const { types, promise, redirect, ...rest } = action;
  const [SUCCESS, REJECTED] = types;

  return async dispatch => {
    try {
      dispatch(budgetsLoading());
      const res = await promise;

      const { data } = res;

      dispatch({ ...rest, type: SUCCESS, payload: data });

      history.push(redirect);
    } catch (err) {
      console.log(err);
      dispatch({ ...rest, type: REJECTED, payload: err });
    }
  };
};

export default thunkCreator;
