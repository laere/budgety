import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { addCheck } from "actions/checks/checkActions";

class AddCheck extends React.Component {
  render() {
    return (
      <div className="auth-form">
        <h1 className="title is-3 auth-form-title">
          Add a check to your balance!
        </h1>
        <Formik
          initialValues={{ checkamount: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log("VALUES", values);
            this.props.addCheck(values);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="auth-form-inputwrapper">
                <label className="label">Check:</label>
                <Field type="number" name="checkamount" className="input" />
                <ErrorMessage
                  className="help is-danger"
                  name="checkamount"
                  component="div"
                  style={{ fontSize: "16px" }}
                />
              </div>
              <button
                type="submit"
                className="button is-primary is-large button-auth"
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
