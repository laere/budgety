import React from "react";
import { Formik, Form } from "formik";
import InputField from "components/InputField";
import { Link } from "react-router-dom";

const GlobalForm = props => {
  // form fields would be props
  const renderFields = () => {
    return props.formFields.map(({ label, name, type, style }) => {
      return (
        <InputField
          name={name}
          type={type}
          label={label}
          style={style}
          key={name}
        />
      );
    });
  };

  return (
    <div className="budget-new">
      <Formik
        validate={values => props.validateFunc(values)}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // console.log("VALUES", values);
          props.actionCreator(values);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            {renderFields()}

            <Link
              to={props.cancelpath}
              type="submit"
              className="button is-danger is-large"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="button is-primary is-large"
              disabled={isSubmitting}
              onSubmit={props.onSubmit}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GlobalForm;
