import React from "react";
import { connect } from "react-redux";
import { editBudget } from "actions/budgets/budgetActions";
import formFields from "components/budgets/formFields";
import GlobalForm from "components/GlobalForm";
import budgetValidation from "validation/budgetValidation";
import PropTypes from "prop-types";

class BudgetEdit extends React.Component {
  handleActionCreator = values => {
    const { budgetId } = this.props.match.params;
    this.props.editBudget(budgetId, values);
  };

  render() {
    const { title, description } = this.props.budget;
    const { budgetId } = this.props.match.params;
    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={budgetValidation}
          initialValues={{ title, description }}
          actionCreator={this.handleActionCreator}
          cancelpath={`/budgets/${budgetId}`}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ budgets }) => {
  return { budget: budgets.budget };
};

BudgetEdit.propTypes = {
  editBudget: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { editBudget }
)(BudgetEdit);
