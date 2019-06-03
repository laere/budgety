import React from "react";
import { connect } from "react-redux";
import { editCheck } from "actions/checks/checkActions";
import formFields from "components/checks/formFields";
import GlobalForm from "components/GlobalForm";
import checkValidation from "validation/checkValidation";
import PropTypes from "prop-types";

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

CheckEdit.propTypes = {
  editCheck: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { editCheck }
)(CheckEdit);
