import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import { Formik, Form } from "formik";
import { editTransaction } from "actions";
import Spinner from "components/Spinner";
import formFields from "components/transactions/formFields";

class TransactionEdit extends React.Component {
  renderFields() {
    return formFields.map(({ label, name, type }) => {
      return <InputField label={label} name={name} type={type} key={name} />;
    });
  }

  render() {
    const { transactions } = this.props.budget;
    const { budgetId, transactionId } = this.props.match.params;

    if (!transactions) {
      return <Spinner />;
    }

    const currentTransaction = transactions.find(
      id => id._id === transactionId
    );

    console.log(currentTransaction);
    return (
      <div>
        <Formik
          initialValues={{
            description: currentTransaction.description,
            amount: currentTransaction.amount
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
            // console.log("VALUES", values);
            this.props.editTransaction(budgetId, transactionId, values);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              {this.renderFields()}
              <Link
                to={`/budgets/${budgetId}`}
                className="button is-danger is-large"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="button is-primary is-large"
                disabled={isSubmitting}
                onSubmit={this.onSubmit}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = ({ budgets }) => {
  return {
    transaction: budgets.transaction,
    budget: budgets.budget,
    loading: budgets.loading
  };
};

export default connect(
  mapStateToProps,
  { editTransaction }
)(TransactionEdit);
