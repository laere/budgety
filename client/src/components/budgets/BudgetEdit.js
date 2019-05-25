import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import formFields from "components/budgets/formFields";

class BudgetEdit extends React.Component {
  renderFields() {
    return formFields.map(({ label, name, type }) => {
      return <InputField name={name} type={type} label={label} />;
    });
  }

  render() {
    console.log(this.props.budget);
    const { amount, title, description, _id } = this.props.budget;
    return (
      <div className="budget-new">
        <Formik
          initialValues={{ amount, title, description }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            // console.log("VALUES", values);
            this.props.editBudget(_id, values);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              {this.renderFields()}
              <Link
                to="/budgets"
                type="submit"
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
  return { budget: budgets.budget };
};

export default connect(
  mapStateToProps,
  actions
)(BudgetEdit);
