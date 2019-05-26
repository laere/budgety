import React from "react";
import { addBudget } from "actions";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import InputField from "components/InputField";
import formFields from "components/budgets/formFields";
import { Link } from "react-router-dom";
import budgetValidation from "validation/budgetValidation";
import GlobalForm from "components/GlobalForm";

class BudgetCreate extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={budgetValidation}
          actionCreator={this.props.addBudget}
          cancelpath="/budgets"
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addBudget }
)(BudgetCreate);
