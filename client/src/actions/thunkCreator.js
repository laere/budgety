import history from "../history";
import { isLoading } from "actions/index.js";

const thunkCreator = action => {
  const { types, promise, redirect, ...rest } = action;
  const [SUCCESS, REJECTED] = types;

  return async dispatch => {
    try {
      // dispatch(isLoading());
      const res = await promise;

      const { data } = res;

      console.log("THUNK DATA", data);

      dispatch({ ...rest, type: SUCCESS, payload: data });

      history.push(redirect);
    } catch (err) {
      dispatch({ ...rest, type: REJECTED, payload: err });
    }
  };
};

export default thunkCreator;
