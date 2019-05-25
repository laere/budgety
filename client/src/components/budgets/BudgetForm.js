import "css/BudgetForm.css";
import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import formFields from "components/budgets/formFields";
import InputField from "components/InputField";

class BudgetForm extends React.Component {
  renderFields() {
    return formFields.map(({ label, name, type }) => {
      return <InputField name={name} type={type} label={label} />;
    });
  }

  render() {
    return (
      <div className="budget-new">
        <Formik
          initialValues={{ checkamount: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            // console.log("VALUES", values);
            this.props.onSubmit(values);
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

export default BudgetForm;
