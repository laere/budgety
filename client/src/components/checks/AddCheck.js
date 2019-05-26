import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputField from "components/InputField";
import { connect } from "react-redux";
import { addCheck } from "actions/checks/checkActions";

class AddCheck extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title is-3">Add a check to your balance!</h1>
        <Formik
          initialValues={{ checkamount: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            // console.log("VALUES", values);
            this.props.addCheck(this.props.match.params.budgetId, values);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <InputField type="number" name="checkamount" label="Check:" />
              <button
                type="submit"
                className="button is-primary is-large"
                style={{ marginTop: "20px" }}
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
  { addCheck }
)(AddCheck);
