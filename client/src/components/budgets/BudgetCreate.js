import React from "react";
import { addBudget } from "actions";
import { connect } from "react-redux";
import formFields from "components/budgets/formFields";
import budgetValidation from "validation/budgetValidation";
import GlobalForm from "components/GlobalForm";
import InputField from "components/InputField";

class BudgetCreate extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={budgetValidation}
          initialValues={{ title: "", description: "" }}
          actionCreator={this.props.addBudget}
          cancelpath="/dashboard"
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addBudget }
)(BudgetCreate);
