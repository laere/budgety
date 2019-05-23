import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
            this.props.addCheck(values);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <label className="label">Check:</label>
              <Field type="number" name="checkamount" className="input" />
              <ErrorMessage
                className="help is-danger"
                name="checkamount"
                component="div"
                style={{ fontSize: "16px" }}
              />

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
