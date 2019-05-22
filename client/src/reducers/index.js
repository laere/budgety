import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "reducers/authReducer";
import budgetsReducer from "reducers/budgetsReducer";
import errorsReducer from "reducers/errorsReducer";
import checksReducer from "reducers/checksReducer";

export default combineReducers({
  auth: authReducer,
  budgets: budgetsReducer,
  checks: checksReducer,
  errors: errorsReducer,
  form: reduxForm
});
