import React from "react";
import { connect } from "react-redux";
import { editCheck } from "actions/checks/checkActions";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import formFields from "components/checks/formFields";
import GlobalForm from "components/GlobalForm";
import checkValidation from "validation/checkValidation";

class CheckEdit extends React.Component {
  handleActionCreator = values => {
    const { budgetId, checkId } = this.props.match.params;
    this.props.editCheck(budgetId, checkId, values);
  };

  render() {
    const { paychecks } = this.props.budget;
    const { checkId } = this.props.match.params;
    if (!paychecks) {
      return <div>Loading...</div>;
    }
    console.log(checkId);
    console.log(this.props.budget);
    const check = paychecks.find(check => check._id === checkId);
    console.log(check);

    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={checkValidation}
          initialValues={{ checkamount: check.checkamount }}
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
  { editCheck }
)(CheckEdit);
