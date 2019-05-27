import React from "react";
import { connect } from "react-redux";
import { editBudget } from "actions";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import formFields from "components/budgets/formFields";
import GlobalForm from "components/GlobalForm";
import budgetValidation from "validation/budgetValidation";

class BudgetEdit extends React.Component {
  handleActionCreator = values => {
    const { budgetId } = this.props.match.params;
    this.props.editBudget(budgetId, values);
  };

  render() {
    const { title, description } = this.props.budget;
    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={budgetValidation}
          initialValues={{ title, description }}
          actionCreator={this.handleActionCreator}
          cancelpath="/budgets"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ budgets }) => {
  return { budget: budgets.budget };
};

export default connect(
  mapStateToProps,
  { editBudget }
)(BudgetEdit);
