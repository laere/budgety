import React from "react";
import { connect } from "react-redux";
import { addCheck } from "actions/checks/checkActions";
import GlobalForm from "components/GlobalForm";
import formFields from "components/checks/formFields";
import checkValidation from "validation/checkValidation";

class AddCheck extends React.Component {
  handleActionCreator = values => {
    const { budgetId } = this.props.match.params;
    this.props.addCheck(budgetId, values);
  };

  render() {
    const { budgetId } = this.props.match.params;
    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={checkValidation}
          initialValues={{ checkamount: "" }}
          actionCreator={this.handleActionCreator}
          cancelpath={`/budgets/${budgetId}`}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addCheck }
)(AddCheck);
