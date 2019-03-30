import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "reducers/authReducer";
import budgetsReducer from "reducers/budgetsReducer";

export default combineReducers({
  auth: authReducer,
  budgets: budgetsReducer,
  form: reduxForm
});
