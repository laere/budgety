import { combineReducers } from "redux";

import authReducer from "reducers/authReducer";
import budgetsReducer from "reducers/budgetsReducer";
import errorsReducer from "reducers/errorsReducer";

export default combineReducers({
  auth: authReducer,
  budgets: budgetsReducer,
  errors: errorsReducer
});
