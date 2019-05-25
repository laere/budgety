import React from "react";
import { addBudget } from "actions";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import InputField from "components/InputField";
import formFields from "components/budgets/formFields";
import { Link } from "react-router-dom";
import budgetValidation from "validation/budgetValidation";

class BudgetCreate extends React.Component {
  renderFields() {
    return formFields.map(({ label, name, type }) => {
      return <InputField name={name} type={type} label={label} key={name} />;
    });
  }

  render() {
    return (
      <div className="budget-new">
        <Formik
          validate={values => budgetValidation(values)}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            // console.log("VALUES", values);
            this.props.addBudget(values);
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

export default connect(
  null,
  { addBudget }
)(BudgetCreate);
